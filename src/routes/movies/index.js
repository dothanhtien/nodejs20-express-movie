"use strict";
const express = require("express");
const {
  getMovies,
  validateCreateMovieSchema,
  createMovie,
  getMovieById,
  updateMovie,
  validateUpdateMovieSchema,
  deleteMovie,
} = require("../../services/movies");
const { getShowtimesByMovieId } = require("../../services/showtimes");
const { authenticate } = require("../../middlewares/auth");
const { uploadImage } = require("../../middlewares/upload");
const { validate } = require("../../middlewares/validator");
const removeFile = require("../../utils/removeFile");
const ApiError = require("../../utils/apiError");

const movieRouter = express.Router();

movieRouter.post(
  "/",
  [
    authenticate,
    uploadImage("movies", "poster"),
    validateCreateMovieSchema(),
    validate,
  ],
  async (req, res, next) => {
    const {
      name,
      description,
      trailer,
      rating,
      duration,
      status,
      releaseDate,
    } = req.body;

    const poster = req.file.path;

    try {
      const movie = await createMovie({
        name,
        description,
        poster,
        trailer,
        rating,
        duration,
        status,
        releaseDate,
      });

      if (!movie) {
        throw new ErrorHandler(500, "Internal server error");
      }

      res.status(201).json({
        status: "success",
        data: {
          movie,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

movieRouter.get("/", [authenticate], async (req, res, next) => {
  try {
    const movies = await getMovies();

    res.json({
      status: "success",
      data: {
        movies,
      },
    });
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);

    if (!movie) {
      throw new ApiError(404, "Movie does not exist");
    }

    res.json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    next(error);
  }
});

movieRouter.put(
  "/:id",
  [authenticate, validateUpdateMovieSchema(), validate],
  async (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      description,
      poster,
      trailer,
      rating,
      duration,
      status,
      releaseDate,
    } = req.body;
    const updates = {
      name,
      description,
      poster,
      trailer,
      rating,
      duration,
      status,
      releaseDate,
    };

    try {
      const movie = await getMovieById(id);
      if (!movie) {
        throw new ApiError(404, "Movie does not exist");
      }

      const isUpdated = await updateMovie(updates, id);
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
          movie: {
            ...movie.dataValues,
            ...updates,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

movieRouter.delete("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);

    if (!movie) {
      throw new ApiError(404, "Movie does not exist");
    }

    await removeFile(movie.poster);

    const isDeleted = await deleteMovie(id);

    if (!isDeleted) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      message: "Movie deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

movieRouter.get("/:id/showtimes", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await getMovieById(id);
    if (!movie) {
      throw new ApiError(404, "Movie does not exist");
    }

    const showtimesOfMovie = await getShowtimesByMovieId(id);

    res.json({
      status: "success",
      data: {
        movie,
        cinemaComplexes: showtimesOfMovie,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = movieRouter;
