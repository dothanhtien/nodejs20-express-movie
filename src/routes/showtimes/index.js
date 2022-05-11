"use strict";
const express = require("express");
const { authenticate } = require("../../middlewares/auth");
const {
  validateCreateShowtimeSchema,
  checkScreenAvailable,
  createShowtime,
  checkShowtimeExistsById,
  deleteShowtimeById,
} = require("../../services/showtimes");
const { getMovieById } = require("../../services/movies");
const { checkScreenExistsById } = require("../../services/screens");
const ApiError = require("../../utils/apiError");
const { validationResult } = require("express-validator");

const showtimeRouter = express.Router();

showtimeRouter.post(
  "/",
  [authenticate, validateCreateShowtimeSchema()],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { movieId, screenId, startTime } = req.body;

    try {
      const movie = await getMovieById(movieId);
      if (!movie) {
        throw new ApiError(404, "Movie does not exist");
      }

      const isScreenExist = await checkScreenExistsById(screenId);
      if (!isScreenExist) {
        throw new ApiError(404, "Screen does not exist");
      }

      // calculate endTime based on startTime and duration of the movie
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + movie.duration);

      // check if do not have any schedule in the screen between startTime and endTime
      const isScreenAvailable = await checkScreenAvailable(
        screenId,
        startTime,
        endTime
      );
      if (!isScreenAvailable) {
        throw new ApiError(400, "Screen is not available during this time");
      }

      const showtime = await createShowtime({
        movieId,
        screenId,
        startTime,
        endTime,
      });

      if (!showtime) {
        throw new ApiError(500, "Internal server error");
      }

      res.json({
        status: "success",
        data: {
          showtime,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

showtimeRouter.delete("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const isExist = await checkShowtimeExistsById(id);
    if (!isExist) {
      throw new ApiError(404, "Showtime does not exist");
    }

    const isDeleted = await deleteShowtimeById(id);
    if (!isDeleted) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      message: "Showtime deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = showtimeRouter;
