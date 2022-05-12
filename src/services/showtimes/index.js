"use strict";
const { body } = require("express-validator");
const { Op } = require("sequelize");
const {
  Showtime,
  CinemaComplex,
  Cinema,
  Screen,
  Movie,
} = require("../../database/models");
const ApiError = require("../../utils/apiError");

const validateCreateShowtimeSchema = () => {
  return [
    body("movieId")
      .notEmpty()
      .withMessage("movieId is required")
      .isInt()
      .withMessage("movieId is invalid"),
    body("screenId")
      .notEmpty()
      .withMessage("screenId is required")
      .isInt()
      .withMessage("screenId is invalid"),
  ];
};

const checkShowtimeExistsById = async (id) => {
  try {
    const count = await Showtime.count({
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

const checkScreenAvailable = async (screenId, startTime, endTime) => {
  try {
    const count = await Showtime.count({
      where: {
        screenId,
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [startTime, endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [startTime, endTime],
            },
          },
        ],
      },
    });

    return count > 0 ? false : true;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const createShowtime = async (data) => {
  try {
    const showtime = await Showtime.create(data);

    return showtime;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getShowtimes = async () => {
  try {
    const showtimes = await Showtime.findAll({
      include: [
        {
          model: Movie,
          as: "movie",
        },
        {
          model: Screen,
          as: "screen",
        },
      ],
    });

    return showtimes;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getShowtimesByMovieId = async (movieId) => {
  try {
    const cinemaComplexShowtimes = await CinemaComplex.findAll({
      include: {
        model: Cinema,
        as: "cinemas",
        attributes: {
          exclude: [
            "address",
            "phoneNumber",
            "rating",
            "description",
            "cinemaComplexId",
          ],
        },
        include: {
          model: Screen,
          as: "screens",
          attributes: {
            exclude: ["cinemaId"],
          },
          include: {
            where: {
              movieId,
            },
            model: Showtime,
            as: "showtimes",
            attributes: {
              exclude: ["movieId", "screenId"],
            },
          },
        },
      },
    });

    return cinemaComplexShowtimes;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getShowtimeById = async (id) => {
  try {
    const showtime = await Showtime.findByPk(id, {
      attributes: { exclude: ["movieId", "screenId"] },
      include: [
        {
          model: Movie,
          as: "movie",
        },
        {
          model: Screen,
          as: "screen",
        },
      ],
    });

    return showtime;
  } catch (error) {
    throw new ErrorHandler(500, "Internal server error");
  }
};

const deleteShowtimeById = async (id) => {
  try {
    const isDeleted = await Showtime.destroy({
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
  validateCreateShowtimeSchema,
  checkShowtimeExistsById,
  checkScreenAvailable,
  createShowtime,
  getShowtimes,
  getShowtimesByMovieId,
  getShowtimeById,
  deleteShowtimeById,
};
