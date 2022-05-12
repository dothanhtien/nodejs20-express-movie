"use strict";
const { body } = require("express-validator");
const { CinemaComplex } = require("../../database/models");
const ApiError = require("../../utils/apiError");

const validateCreateCinemaComplexSchema = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Cinema complex name is required")
      .isLength({ max: 255 })
      .withMessage("Cinema complex name exceeds 255 characters"),
  ];
};

const validateUpdateCinemaComplexSchema = () => {
  return [
    body("name")
      .optional({ nullable: true })
      .trim()
      .notEmpty()
      .withMessage("Cinema complex name is required")
      .isLength({ max: 255 })
      .withMessage("Cinema complex name exceeds 255 characters"),
  ];
};

const checkCinemaComplexExistsById = async (id) => {
  try {
    const count = await CinemaComplex.count({
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

const createCinemaComplex = async (data) => {
  try {
    const cinemaComplex = await CinemaComplex.create(data);

    return cinemaComplex;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getCinemaComplexes = async () => {
  try {
    const cinemaComplexes = await CinemaComplex.findAll();

    return cinemaComplexes;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getCinemaComplexById = async (id) => {
  try {
    const cinemaComplex = await CinemaComplex.findByPk(id);

    return cinemaComplex;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updateCinemaComplex = async (data, id) => {
  try {
    const isUpdated = await CinemaComplex.update(data, {
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

const deleteCinemaComplexById = async (id) => {
  try {
    const isDeleted = await CinemaComplex.destroy({
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
  validateCreateCinemaComplexSchema,
  validateUpdateCinemaComplexSchema,
  checkCinemaComplexExistsById,
  createCinemaComplex,
  getCinemaComplexes,
  getCinemaComplexById,
  updateCinemaComplex,
  deleteCinemaComplexById,
};
