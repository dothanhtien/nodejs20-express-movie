"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const { authenticate } = require("../../middlewares/auth");
const {
  getCinemas,
  getCinemaById,
  validateCreateCinemaSchema,
  checkCinemaExistsByName,
  createCinema,
  validateUpdateCinemaSchema,
  updateCinema,
  checkCinemaExistsById,
  deleteCinemaById,
} = require("../../services/cinemas");
const ApiError = require("../../utils/apiError");

const cinemaRouter = express.Router();

cinemaRouter.post(
  "/",
  [authenticate, validateCreateCinemaSchema()],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { name, address, phoneNumber, rating, description, cinemaComplexId } =
      req.body;

    try {
      const isExist = await checkCinemaExistsByName(name);
      if (isExist) {
        throw new ApiError(400, "Cinema name already exists");
      }

      const cinema = await createCinema({
        name,
        address,
        phoneNumber,
        rating,
        description,
        cinemaComplexId,
      });
      if (!cinema) {
        throw new ApiError(500, "Internal server error");
      }

      res.status(201).json({
        status: "success",
        data: {
          cinema,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

cinemaRouter.get("/", [authenticate], async (req, res, next) => {
  try {
    const cinemas = await getCinemas();

    if (!cinemas) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      data: {
        cinemas,
      },
    });
  } catch (error) {
    next(error);
  }
});

cinemaRouter.get("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const cinema = await getCinemaById(id);

    if (!cinema) {
      throw new ApiError(404, "Cinema does not exist");
    }

    res.json({
      status: "success",
      data: {
        cinema,
      },
    });
  } catch (error) {
    next(error);
  }
});

cinemaRouter.put(
  "/:id",
  [authenticate, validateUpdateCinemaSchema()],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { id } = req.params;
    const { name, address, phoneNumber, rating, description, cinemaComplexId } =
      req.body;
    const updates = {
      name,
      address,
      phoneNumber,
      rating,
      description,
      cinemaComplexId,
    };

    try {
      const cinema = await getCinemaById(id);
      if (!cinema) {
        throw new ApiError(404, "Cinema does not exist");
      }

      // remove undefined properties to include in the response
      Object.keys(updates).forEach((key) => {
        if (updates[key] === undefined || updates[key] === null) {
          delete updates[key];
        }
      });

      const isUpdated = await updateCinema(updates, id);
      if (!isUpdated) {
        throw new ApiError(500, "Internal server error");
      }

      res.json({
        status: "success",
        data: {
          cinema: {
            ...cinema.dataValues,
            ...updates,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

cinemaRouter.delete("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const isExist = await checkCinemaExistsById(id);
    if (!isExist) {
      throw new ApiError(404, "Cinema does not exist");
    }

    const isDeleted = await deleteCinemaById(id);
    if (!isDeleted) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      message: "Cinema deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = cinemaRouter;
