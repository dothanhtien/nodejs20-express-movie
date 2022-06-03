"use strict";
const { Op } = require("sequelize");
const { body } = require("express-validator");
const { Cinema } = require("../../database/models");
const ApiError = require("../../utils/apiError");
const { getPagination, getPagingData } = require("../pagination");

const validateCreateCinemaSchema = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Cinema name is required")
      .isLength({ max: 255 })
      .withMessage("Cinema name exceeds 255 characters"),
    body("address").optional({ nullable: true }).trim(),
    body("phoneNumber")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 30 })
      .withMessage("Phone number exceeds 30 characters"),
    body("rating")
      .optional({ nullable: true })
      .toFloat()
      .isFloat()
      .withMessage("Rating is invalid")
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("description").optional({ nullable: true }).trim(),
    body("cinemaComplexId")
      .notEmpty()
      .withMessage("cinemaComplexId is required")
      .isInt()
      .withMessage("cinemaComplexId is invalid"),
  ];
};

const validateUpdateCinemaSchema = () => {
  return [
    body("name")
      .optional({ nullable: true })
      .trim()
      .notEmpty()
      .withMessage("Cinema name is required")
      .isLength({ max: 255 })
      .withMessage("Cinema name exceeds 255 characters"),
    body("address").optional({ nullable: true }).trim(),
    body("phoneNumber")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 30 })
      .withMessage("Phone number exceeds 30 characters"),
    body("rating")
      .optional({ nullable: true })
      .toFloat()
      .isFloat()
      .withMessage("Rating is invalid")
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("description").optional({ nullable: true }).trim(),
    body("cinemaComplexId")
      .notEmpty()
      .withMessage("cinemaComplexId is required")
      .isInt()
      .withMessage("cinemaComplexId is invalid"),
  ];
};

const checkCinemaExistsById = async (id) => {
  try {
    const count = await Cinema.count({
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

const checkCinemaExistsByName = async (name) => {
  try {
    const count = await Cinema.count({
      where: {
        name,
      },
    });

    return count > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const createCinema = async (data) => {
  try {
    const cinema = await Cinema.create(data);

    return cinema;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getCinemas = async (name) => {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  try {
    const cinemas = await Cinema.findAll({
      where: condition,
    });

    return cinemas;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getCinemasWithPagination = async (name, page, size) => {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await Cinema.findAndCountAll({
      where: condition,
      limit,
      offset,
    });

    return getPagingData(data, page, limit, "cinemas");
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getCinemaById = async (id) => {
  try {
    const cinema = await Cinema.findByPk(id);

    return cinema;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updateCinema = async (data, id) => {
  try {
    const isUpdated = await Cinema.update(data, {
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

const deleteCinemaById = async (id) => {
  try {
    const isDeleted = await Cinema.destroy({
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
  validateCreateCinemaSchema,
  validateUpdateCinemaSchema,
  checkCinemaExistsById,
  checkCinemaExistsByName,
  createCinema,
  getCinemas,
  getCinemasWithPagination,
  getCinemaById,
  updateCinema,
  deleteCinemaById,
};
