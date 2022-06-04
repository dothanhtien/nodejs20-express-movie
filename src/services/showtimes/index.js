"use strict";
const { body } = require("express-validator");
const { Op } = require("sequelize");
const {
  Showtime,
  CinemaComplex,
  Cinema,
  Screen,
  Movie,
  Ticket,
} = require("../../database/models");
const ApiError = require("../../utils/apiError");
const { getPagination, getPagingData } = require("../pagination");

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
    body("price")
      .optional({ nullable: true })
      .isInt()
      .withMessage("Price is invalid")
      .toInt(),
  ];
};

const validateUpdateShowtimeSchema = () => {
  return [
    body("movieId")
      .optional({ nullable: true })
      .notEmpty()
      .withMessage("movieId is required")
      .isInt()
      .withMessage("movieId is invalid"),
    body("screenId")
      .optional({ nullable: true })
      .notEmpty()
      .withMessage("screenId is required")
      .isInt()
      .withMessage("screenId is invalid"),
    body("price")
      .optional({ nullable: true })
      .isInt()
      .withMessage("Price is invalid")
      .toInt(),
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

const checkScreenAvailableWithExistingShowtime = async (
  showtimeId,
  screenId,
  startTime,
  endTime
) => {
  try {
    const count = await Showtime.count({
      where: {
        id: {
          [Op.notIn]: [showtimeId],
        },
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
    const showtime = await Showtime.create(data, {
      include: [
        {
          association: "tickets",
          as: "tickets",
        },
      ],
    });

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

const getShowtimesWithPagination = async (page, size) => {
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await Showtime.findAndCountAll({
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
      limit,
      offset,
    });

    return getPagingData(data, page, limit, "showtimes");
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
        {
          model: Ticket,
          as: "tickets",
        },
      ],
    });

    return showtime;
  } catch (error) {
    throw new ErrorHandler(500, "Internal server error");
  }
};

const getShowtimesByMovieId = async (movieId) => {
  try {
    const movieShowtimes = await CinemaComplex.findAll({
      include: {
        model: Cinema,
        as: "cinemas",
        include: {
          model: Screen,
          as: "screens",
          required: true,
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

    return movieShowtimes;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getShowtimesOfCinemaComplexes = async () => {
  try {
    const cinemaComplexesShowtimes = await CinemaComplex.findAll({
      include: {
        model: Cinema,
        as: "cinemas",
        required: true,
        include: {
          model: Screen,
          as: "screens",
          required: true,
          include: {
            model: Showtime,
            as: "showtimes",
            attributes: {
              exclude: ["movieId", "screenId"],
            },
            include: {
              model: Movie,
              as: "movie",
            },
          },
        },
      },
    });

    return cinemaComplexesShowtimes;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updateShowtime = async (data, id) => {
  try {
    const isUpdated = await Showtime.update(data, {
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
  validateUpdateShowtimeSchema,
  checkShowtimeExistsById,
  checkScreenAvailable,
  checkScreenAvailableWithExistingShowtime,
  createShowtime,
  getShowtimes,
  getShowtimesWithPagination,
  getShowtimesByMovieId,
  getShowtimesOfCinemaComplexes,
  getShowtimeById,
  updateShowtime,
  deleteShowtimeById,
};
