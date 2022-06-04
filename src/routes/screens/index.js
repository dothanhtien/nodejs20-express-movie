"use strict";
const express = require("express");
const { authenticate, authorize } = require("../../middlewares/auth");
const { catchRequestError } = require("../../middlewares/validator");
const {
  getScreens,
  getScreenById,
  checkScreenExistsInCinemaByName,
  createScreen,
  validateCreateScreenSchema,
  updateScreen,
  validateUpdateScreenSchema,
  checkScreenExistsById,
  deleteScreenById,
  getScreensWithPagination,
} = require("../../services/screens");
const { checkCinemaExistsById } = require("../../services/cinemas");
const ApiError = require("../../utils/apiError");
const { validatePagingQueries } = require("../../services/pagination");

const screenRouter = express.Router();

screenRouter.post(
  "/",
  [
    authenticate,
    authorize("admin"),
    validateCreateScreenSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
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
        throw new ApiError(500, "An error occurred while creating the screen");
      }

      await screen.reload();

      res.status(201).json({
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

screenRouter.get("/all", async (req, res, next) => {
  try {
    const screens = await getScreens();
    if (!screens) {
      throw new ApiError(500, "An error occurred while fetching the screens");
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

screenRouter.get(
  "/",
  [validatePagingQueries(), catchRequestError],
  async (req, res, next) => {
    const { page, limit } = req.query;

    try {
      const data = await getScreensWithPagination(page, limit);
      if (!data) {
        throw new ApiError(500, "An error occurred while fetching the screens");
      }

      res.json({
        status: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

screenRouter.get("/:id", async (req, res, next) => {
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

screenRouter.put(
  "/:id",
  [
    authenticate,
    authorize("admin"),
    validateUpdateScreenSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
    const { id } = req.params;
    const updates = {
      name: req.body.name,
      cinemaId: req.body.cinemaId,
    };

    try {
      const screen = await getScreenById(id);
      if (!screen) {
        throw new ApiError(404, "Screen does not exist");
      }

      const isCinemaExist = await checkCinemaExistsById(updates.cinemaId);
      if (!isCinemaExist) {
        throw new ApiError(400, "Cinema does not exist");
      }

      Object.keys(updates).forEach((key) => {
        if (updates[key] === undefined || updates[key] === null) {
          updates[key] = screen[key];
        }
      });

      const isScreenExist = await checkScreenExistsInCinemaByName(
        updates.name,
        updates.cinemaId
      );
      if (isScreenExist) {
        throw new ApiError(
          400,
          "The next updated screen name already exists in the Cinema"
        );
      }

      const isUpdated = await updateScreen(updates, id);
      if (!isUpdated) {
        throw new ApiError(500, "An error occurred while updating the screen");
      }

      await screen.reload();

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

screenRouter.delete(
  "/:id",
  [authenticate, authorize("admin")],
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const isExist = await checkScreenExistsById(id);
      if (!isExist) {
        throw new ApiError(404, "Screen does not exist");
      }

      const isDeleted = await deleteScreenById(id);
      if (!isDeleted) {
        throw new ApiError(500, "An error occurred while deleting the screen");
      }

      res.json({
        status: "success",
        message: "Screen deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = screenRouter;
