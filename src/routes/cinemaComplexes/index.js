"use strict";
const express = require("express");
const { authenticate, authorize } = require("../../middlewares/auth");
const { uploadImage } = require("../../middlewares/upload");
const { catchRequestError } = require("../../middlewares/validator");
const {
  validateCreateCinemaComplexSchema,
  createCinemaComplex,
  getCinemaComplexes,
  getCinemaComplexById,
  deleteCinemaComplexById,
  validateUpdateCinemaComplexSchema,
  updateCinemaComplex,
} = require("../../services/cinemaComplexes");
const ApiError = require("../../utils/apiError");
const removeFile = require("../../utils/removeFile");
const { parseBoolean } = require("../../utils/helpers");

const cinemaComplexRouter = express.Router();

cinemaComplexRouter.post(
  "/",
  [
    authenticate,
    authorize("admin"),
    uploadImage("cinemaComplexes", "logo"),
    validateCreateCinemaComplexSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
    const { name } = req.body;
    const logo = req.file?.path;

    try {
      const cinemaComplex = await createCinemaComplex({ name, logo });

      if (!cinemaComplex) {
        throw new ApiError(
          500,
          "An error occurred while creating the cinema complex"
        );
      }

      await cinemaComplex.reload();

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
  const { includeCinemas, includeScreens } = req.query;

  try {
    const cinemaComplexes = await getCinemaComplexes(
      parseBoolean(includeCinemas),
      parseBoolean(includeScreens)
    );

    if (!cinemaComplexes) {
      throw new ApiError(
        500,
        "An error occurred while fetching the cinema complexes"
      );
    }

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
    authorize("admin"),
    uploadImage("cinemaComplexes", "logo"),
    validateUpdateCinemaComplexSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
    const { id } = req.params;
    const updates = { name: req.body.name };
    updates.logo = req.file?.path;

    try {
      const cinemaComplex = await getCinemaComplexById(id);
      if (!cinemaComplex) {
        throw new ApiError(404, "Cinema complex does not exist");
      }

      if (updates.logo) {
        await removeFile(cinemaComplex.logo);
      }

      const isUpdated = await updateCinemaComplex(updates, id);
      if (!isUpdated) {
        throw new ApiError(
          500,
          "An error occurred while updating the cinema complex"
        );
      }

      await cinemaComplex.reload();

      res.json({
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

cinemaComplexRouter.delete(
  "/:id",
  [authenticate, authorize("admin")],
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const cinemaComplex = await getCinemaComplexById(id);
      if (!cinemaComplex) {
        throw new ApiError(404, "Cinema complex does not exist");
      }

      const numOfCinemas = await cinemaComplex.countCinemas();
      if (numOfCinemas > 0) {
        throw new ApiError(
          400,
          "Please delete the cinemas belonging to this cinema complex first"
        );
      }

      await removeFile(cinemaComplex.logo);

      const isDeleted = await deleteCinemaComplexById(id);
      if (!isDeleted) {
        throw new ApiError(
          500,
          "An error occurred while deleting the cinema complex"
        );
      }

      res.json({
        status: "success",
        message: "Cinema complex deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = cinemaComplexRouter;
