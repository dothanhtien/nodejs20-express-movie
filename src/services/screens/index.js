"use strict";
const { body } = require("express-validator");
const { Op } = require("sequelize");
const { Screen } = require("../../database/models");
const ApiError = require("../../utils/apiError");
const { getPagination, getPagingData } = require("../pagination");

const validateCreateScreenSchema = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Screen name is required")
      .isLength({ max: 255 })
      .withMessage("Screen name exceeds 255 characters"),
    body("cinemaId")
      .notEmpty()
      .withMessage("cinemaId is required")
      .isInt()
      .withMessage("cinemaId is invalid")
      .toInt(),
  ];
};

const validateUpdateScreenSchema = () => {
  return [
    body("name")
      .optional({ nullable: true })
      .trim()
      .notEmpty()
      .withMessage("Screen name is required")
      .isLength({ max: 255 })
      .withMessage("Screen name exceeds 255 characters"),
    body("cinemaId")
      .optional({ nullable: true })
      .notEmpty()
      .withMessage("cinemaId is required")
      .isInt()
      .withMessage("cinemaId is invalid")
      .toInt(),
  ];
};

const checkScreenExistsById = async (id) => {
  try {
    const count = await Screen.count({
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

const checkScreenExistsInCinemaByName = async (name, cinemaId) => {
  try {
    const count = await Screen.count({
      where: {
        [Op.and]: [{ name }, { cinemaId }],
      },
    });

    return count > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const createScreen = async (data) => {
  try {
    const screen = await Screen.create(data, {
      include: {
        association: "seats",
        as: "seats",
      },
    });

    return screen;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getScreens = async () => {
  try {
    const screens = await Screen.findAll();

    return screens;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getScreensWithPagination = async (page, size) => {
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await Screen.findAndCountAll({
      limit,
      offset,
    });

    return getPagingData(data, page, limit, "screens");
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getScreenById = async (id) => {
  try {
    const screen = await Screen.findByPk(id);

    return screen;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updateScreen = async (data, id) => {
  try {
    const isUpdated = await Screen.update(data, {
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

const deleteScreenById = async (id) => {
  try {
    const isDeleted = await Screen.destroy({
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
  validateCreateScreenSchema,
  validateUpdateScreenSchema,
  checkScreenExistsById,
  checkScreenExistsInCinemaByName,
  createScreen,
  getScreens,
  getScreensWithPagination,
  getScreenById,
  updateScreen,
  deleteScreenById,
};
