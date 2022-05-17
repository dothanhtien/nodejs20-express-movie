"use strict";
const { Booking } = require("../../database/models");
const ApiError = require("../../utils/apiError");

const createBooking = async (data) => {
  try {
    const booking = await Booking.create(data);

    return booking;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

module.exports = {
  createBooking,
};
