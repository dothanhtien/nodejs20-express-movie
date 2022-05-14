"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const { authenticate } = require("../../middlewares/auth");
const { uploadImage } = require("../../middlewares/upload");
const ApiError = require("../../utils/apiError");
const {
  validateCreateCinemaComplexSchema,
  createCinemaComplex,
  getCinemaComplexes,
  getCinemaComplexById,
  checkCinemaComplexExistsById,
  deleteCinemaComplexById,
  validateUpdateCinemaComplexSchema,
  updateCinemaComplex,
} = require("../../services/cinemaComplexes");
const removeFile = require("../../utils/removeFile");

const cinemaComplexRouter = express.Router();

cinemaComplexRouter.post(
  "/",
  [
    authenticate,
    uploadImage("cinemaComplexes", "logo"),
    validateCreateCinemaComplexSchema(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { name } = req.body;
    const logo = req.file?.path || null;

    try {
      const cinemaComplex = await createCinemaComplex({ name, logo });

      if (!cinemaComplex) {
        throw new ApiError(500, "Internal server error");
      }

      res.status(201).json({
        status: "success",
        data: {
          cinemaComplex,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

cinemaComplexRouter.get("/", async (req, res, next) => {
  try {
    const cinemaComplexes = await getCinemaComplexes();

    res.json({
      status: "success",
      data: {
        cinemaComplexes,
      },
    });
  } catch (error) {
    next(error);
  }
});

cinemaComplexRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const cinemaComplex = await getCinemaComplexById(id);

    if (!cinemaComplex) {
      throw new ApiError(404, "Cinema complex does not exist");
    }

    res.json({
      status: "success",
      data: {
        cinemaComplex,
      },
    });
  } catch (error) {
    next(error);
  }
});

cinemaComplexRouter.put(
  "/:id",
  [
    authenticate,
    uploadImage("cinemaComplexes", "logo"),
    validateUpdateCinemaComplexSchema(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { id } = req.params;
    const { name } = req.body;
    const updates = { name };
    updates.logo = req.file?.path || undefined;

    try {
      const cinemaComplex = await getCinemaComplexById(id);
      if (!cinemaComplex) {
        throw new ApiError(404, "Cinema complex does not exist");
      }

      console.log(cinemaComplex);

      const isUpdated = await updateCinemaComplex(updates, id);

      if (!isUpdated) {
        throw new ApiError(500, "Internal server error");
      }

      // remove undefined properties to include in the response
      Object.keys(updates).forEach((key) => {
        if (updates[key] === undefined) {
          delete updates[key];
        }
      });

      res.json({
        status: "success",
        data: {
          cinemaComplex: {
            ...cinemaComplex.dataValues,
            ...updates,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

cinemaComplexRouter.delete("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const cinemaComplex = await getCinemaComplexById(id);
    if (!cinemaComplex) {
      throw new ApiError(404, "Cinema complex does not exist");
    }

    const isDeleted = await deleteCinemaComplexById(id);
    if (!isDeleted) {
      throw new ApiError(500, "Internal server error");
    }

    // remove logo image
    const {
      dataValues: { logo: rawLogo },
    } = cinemaComplex;
    removeFile(rawLogo);

    res.json({
      status: "success",
      message: "Cinema complex deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = cinemaComplexRouter;