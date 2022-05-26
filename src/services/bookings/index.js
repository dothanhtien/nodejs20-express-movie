"use strict";
const { body } = require("express-validator");
const { Booking, Ticket, User } = require("../../database/models");
const ApiError = require("../../utils/apiError");

const validateCreateBookingSchema = () => {
  return [
    body("showtimeId")
      .trim()
      .notEmpty()
      .withMessage("showtimeId is required")
      .isInt()
      .withMessage("showtimeId is invalid")
      .toInt(),
    body("tickets")
      .notEmpty()
      .withMessage("tickets are required")
      .isArray()
      .withMessage("tickets is not in the correct format"),
    body("tickets.*.ticketId")
      .trim()
      .notEmpty()
      .withMessage("ticketId is required")
      .isInt()
      .withMessage("ticketId is invalid")
      .toInt(),
  ];
};

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
  validateCreateBookingSchema,
  createBooking,
  getBookings,
  getBookingById,
  deleteBookingById,
};
