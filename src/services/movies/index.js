"use strict";
const { Op } = require("sequelize");
const { body } = require("express-validator");
const { Movie } = require("../../database/models");
const ApiError = require("../../utils/apiError");
const { getPagination, getPagingData } = require("../pagination");

const validateCreateMovieSchema = () => {
  return [
    body("name").trim().notEmpty().withMessage("Movie name is required"),
    body("description").optional({ nullable: true }).trim(),
    body("poster")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Poster has exceeds 255 characters"),
    body("trailer")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Trailer has exceeds 255 characters"),
    body("rating")
      .optional({ nullable: true })
      .toFloat()
      .isFloat()
      .withMessage("Rating is invalid")
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("duration")
      .notEmpty()
      .withMessage("Duration is required")
      .isInt()
      .withMessage("Duration is invalid")
      .toInt(),
    body("status")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Status has exceeds 255 characters"),
    body("releaseDate")
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage("Release date is invalid"),
  ];
};

const validateUpdateMovieSchema = () => {
  return [
    body("name")
      .optional({ nullable: true })
      .trim()
      .notEmpty()
      .withMessage("Movie name is required"),
    body("description").optional({ nullable: true }).trim(),
    body("poster")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Poster has exceeds 255 characters"),
    body("trailer")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Trailer has exceeds 255 characters"),
    body("rating")
      .optional({ nullable: true })
      .toFloat()
      .isFloat()
      .withMessage("Rating is invalid")
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("duration")
      .optional({ nullable: true })
      .notEmpty()
      .withMessage("Duration is required")
      .isInt()
      .withMessage("Duration is invalid")
      .toInt(),
    body("status")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Status has exceeds 255 characters"),
    body("releaseDate")
      .optional({ nullable: true })
      .isISO8601()
      .withMessage("Release date is invalid"),
  ];
};

const checkMovieExistsById = async (id) => {
  try {
    const count = await Movie.count({
      where: {
        id,
      },
    });

    return count > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);

    return movie;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getMovies = async (name) => {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  try {
    const movies = await Movie.findAll({
      where: condition,
    });

    return movies;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getMoviesWithPagination = async (name, page, size) => {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await Movie.findAndCountAll({
      where: condition,
      limit,
      offset,
    });

    return getPagingData(data, page, limit, "movies");
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await Movie.findByPk(id);

    return movie;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updateMovie = async (data, id) => {
  try {
    const isUpdated = await Movie.update(data, {
      where: {
        id,
      },
    });

    return isUpdated[0] > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const deleteMovie = async (id) => {
  try {
    const isDeleted = await Movie.destroy({
      where: {
        id,
      },
    });

    return isDeleted > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

module.exports = {
  validateCreateMovieSchema,
  validateUpdateMovieSchema,
  checkMovieExistsById,
  createMovie,
  getMovies,
  getMoviesWithPagination,
  getMovieById,
  updateMovie,
  deleteMovie,
};
