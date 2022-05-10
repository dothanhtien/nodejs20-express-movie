"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const { authenticate } = require("../../middlewares/auth");
const {
  getScreens,
  getScreenById,
  checkScreenExistsInCinemaByName,
  createScreen,
  validateCreateScreenSchema,
} = require("../../services/screens");
const { checkCinemaExistsById } = require("../../services/cinemas");
const ApiError = require("../../utils/apiError");

const screenRouter = express.Router();

screenRouter.post(
  "/",
  [authenticate, validateCreateScreenSchema()],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { name, cinemaId } = req.body;

    try {
      const isCinemaExist = await checkCinemaExistsById(cinemaId);
      if (!isCinemaExist) {
        throw new ApiError(400, "Cinema does not exist");
      }

      const isScreenExist = await checkScreenExistsInCinemaByName(
        name,
        cinemaId
      );
      if (isScreenExist) {
        throw new ApiError(400, "Screen name already exists in the Cinema");
      }

      const screen = await createScreen({ name, cinemaId });
      if (!screen) {
        throw new ApiError(500, "Internal server error");
      }

      res.json({
        status: "success",
        data: {
          screen,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

screenRouter.get("/", [authenticate], async (req, res, next) => {
  try {
    const screens = await getScreens();

    if (!screens) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      data: {
        screens,
      },
    });
  } catch (error) {
    next(error);
  }
});

screenRouter.get("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const screen = await getScreenById(id);

    if (!screen) {
      throw new ApiError(404, "Screen does not exist");
    }

    res.json({
      status: "success",
      data: {
        screen,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = screenRouter;
