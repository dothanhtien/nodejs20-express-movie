"use strict";
const express = require("express");
const { authenticate, authorize } = require("../../middlewares/auth");
const { catchRequestError } = require("../../middlewares/validator");
const {
  validateCreateShowtimeSchema,
  checkScreenAvailable,
  createShowtime,
  checkShowtimeExistsById,
  deleteShowtimeById,
  getShowtimes,
  getShowtimeById,
  checkScreenAvailableWithExistingShowtime,
  updateShowtime,
  validateUpdateShowtimeSchema,
  getShowtimesWithPagination,
} = require("../../services/showtimes");
const { getMovieById } = require("../../services/movies");
const { checkScreenExistsById } = require("../../services/screens");
const ApiError = require("../../utils/apiError");
const { getSeatsByScreenId } = require("../../services/seats");
const { updatePriceOfTicketsByShowtimeId } = require("../../services/tickets");
const { validatePagingQueries } = require("../../services/pagination");

const showtimeRouter = express.Router();

showtimeRouter.post(
  "/",
  [
    authenticate,
    authorize("admin"),
    validateCreateShowtimeSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
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
        throw new ApiError(
          500,
          "An error occurred while creating the showtime"
        );
      }

      await showtime.reload();

      res.status(201).json({
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

showtimeRouter.get("/all", async (req, res, next) => {
  try {
    const showtimes = await getShowtimes();

    if (!showtimes) {
      throw new ApiError(500, "An error occurred while fetching the showtimes");
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

showtimeRouter.get(
  "/",
  [validatePagingQueries(), catchRequestError],
  async (req, res, next) => {
    const { page, limit } = req.query;

    try {
      const data = await getShowtimesWithPagination(page, limit);

      if (!data) {
        throw new ApiError(
          500,
          "An error occurred while fetching the showtimes"
        );
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

showtimeRouter.get("/:id", async (req, res, next) => {
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

showtimeRouter.put(
  "/:id",
  [
    authenticate,
    authorize("admin"),
    validateUpdateShowtimeSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
    const { id } = req.params;
    const { movieId, screenId, startTime, price } = req.body;

    try {
      const showtime = await getShowtimeById(id);
      if (!showtime) {
        throw new ApiError(404, "Showtime does not exist");
      }

      let movie = null;
      if (movieId) {
        movie = await getMovieById(movieId);
        if (!movie) {
          throw new ApiError(404, "Movie does not exist");
        }
      }

      if (screenId) {
        const isScreenExist = await checkScreenExistsById(screenId);
        if (!isScreenExist) {
          throw new ApiError(404, "Screen does not exist");
        }
      }

      // calculate endTime based on startTime and duration of the movie
      const endTime = new Date(startTime ? startTime : showtime.startTime);
      endTime.setMinutes(
        endTime.getMinutes() +
          (movieId ? movie.duration : showtime.movie.duration)
      );

      // check if do not have any schedule in the screen between startTime and endTime
      const isScreenAvailable = await checkScreenAvailableWithExistingShowtime(
        id,
        screenId ? screenId : showtime.screen.id,
        startTime ? startTime : showtime.startTime,
        endTime
      );
      if (!isScreenAvailable) {
        throw new ApiError(400, "Screen is not available during this time");
      }

      if (price) {
        const priceOfTicketsUpdated = updatePriceOfTicketsByShowtimeId(
          price,
          id
        );
        if (!priceOfTicketsUpdated) {
          throw new ApiError(
            500,
            "An error occurred while updating the tickets"
          );
        }
      }

      const isUpdated = await updateShowtime(
        { movieId, screenId, startTime, endTime },
        id
      );
      if (!isUpdated) {
        throw new ApiError(
          500,
          "An error occurred while updating the showtime"
        );
      }

      await showtime.reload();

      res.json({
        status: "success",
        showtime,
      });
    } catch (error) {
      next(error);
    }
  }
);

showtimeRouter.delete(
  "/:id",
  [authenticate, authorize("admin")],
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const isExist = await checkShowtimeExistsById(id);
      if (!isExist) {
        throw new ApiError(404, "Showtime does not exist");
      }

      const isDeleted = await deleteShowtimeById(id);
      if (!isDeleted) {
        throw new ApiError(
          500,
          "An error occurred while deleting the showtime"
        );
      }

      res.json({
        status: "success",
        message: "Showtime deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = showtimeRouter;
