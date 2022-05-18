"use strict";
const express = require("express");
const { authenticate } = require("../../middlewares/auth");
const {
  createBooking,
  getBookings,
  getBookingById,
} = require("../../services/bookings");
const { getShowtimeById } = require("../../services/showtimes");
const ApiError = require("../../utils/apiError");

const bookingRouter = express.Router();

bookingRouter.post("/", [authenticate], async (req, res, next) => {
  const { showtimeId, tickets } = req.body;

  try {
    const showtime = await getShowtimeById(showtimeId);
    if (!showtime) {
      throw new ApiError(404, "Showtime does not exist");
    }

    const ticketsOfShowtime = await showtime.getTickets();

    const availableTickets = ticketsOfShowtime
      .filter((ticket) => !ticket.status)
      .map((ticket) => ticket.id);

    const ticketsValid = tickets.every((ticket) =>
      availableTickets.includes(ticket)
    );
    if (!ticketsValid) {
      throw new ApiError(
        400,
        "The ticket list is not valid, please check again"
      );
    }

    const booking = await createBooking({ userId: req.user.id });

    res.json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
});

bookingRouter.get("/", [authenticate], async (req, res, next) => {
  try {
    const bookings = await getBookings();

    if (!bookings) {
      throw new ApiError(500, "Internal server error");
    }

    res.json({
      status: "success",
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
});

bookingRouter.get("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const booking = await getBookingById(id);

    if (!booking) {
      throw new ApiError(404, "Booking does not exist");
    }

    res.json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = bookingRouter;
