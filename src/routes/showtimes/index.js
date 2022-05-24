"use strict";
const express = require("express");
const { authenticate } = require("../../middlewares/auth");
const {
  validateCreateShowtimeSchema,
  checkScreenAvailable,
  createShowtime,
  checkShowtimeExistsById,
  deleteShowtimeById,
  getShowtimes,
  getShowtimeById,
} = require("../../services/showtimes");
const { getMovieById } = require("../../services/movies");
const { checkScreenExistsById } = require("../../services/screens");
const ApiError = require("../../utils/apiError");
const { validationResult } = require("express-validator");
const { getSeatsByScreenId } = require("../../services/seats");

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

    let { movieId, screenId, startTime, price } = req.body;

    // return price = 0 instead of 'null' or 'not returned' when creating new showtime without supplying price
    if (!price) price = 0;

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

      const seats = await getSeatsByScreenId(screenId);
      const tickets = seats.map((seat) => {
        return {
          price,
          status: false,
          seatId: seat.id,
        };
      });

      const showtime = await createShowtime({
        movieId,
        screenId,
        startTime,
        endTime,
        tickets,
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

showtimeRouter.get("/", [authenticate], async (req, res, next) => {
  try {
    const showtimes = await getShowtimes();

    if (!showtimes) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      data: {
        showtimes,
      },
    });
  } catch (error) {
    next(error);
  }
});

showtimeRouter.get("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const showtime = await getShowtimeById(id);

    if (!showtime) {
      throw new ApiError(404, "Showtime does not exist");
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
});

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
