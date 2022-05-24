"use strict";
const { Booking, Ticket, User } = require("../../database/models");
const ApiError = require("../../utils/apiError");

const createBooking = async (data) => {
  try {
    const booking = await Booking.create(data, {
      include: [
        {
          association: "bookingDetails",
          as: "bookingDetails",
        },
      ],
    });

    return booking;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getBookings = async () => {
  try {
    const bookings = await Booking.findAll({
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: Ticket,
          as: "tickets",
          through: { attributes: [] },
        },
      ],
    });

    return bookings;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getBookingById = async (id) => {
  try {
    const booking = await Booking.findByPk(id, {
      attributes: { exclude: ["userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
        {
          model: Ticket,
          as: "tickets",
          through: { attributes: [] },
        },
      ],
    });

    return booking;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const deleteBookingById = async (id) => {
  try {
    const isDeleted = await Booking.destroy({
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
  createBooking,
  getBookings,
  getBookingById,
  deleteBookingById,
};
