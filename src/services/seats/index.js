"use strict";
const { Seat } = require("../../database/models");
const ApiError = require("../../utils/apiError");

const getSeatsByScreenId = async (screenId) => {
  try {
    const seats = await Seat.findAll({
      where: {
        screenId,
      },
    });

    return seats;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

module.exports = {
  getSeatsByScreenId,
};
