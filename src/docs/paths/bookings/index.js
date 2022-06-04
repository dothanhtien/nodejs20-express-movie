const getAllBookings = require("./getAllBookings");
const getBookings = require("./getBookings");
const createBooking = require("./createBooking");
const getBooking = require("./getBooking");
const deleteBooking = require("./deleteBooking");
const cancelBooking = require("./cancelBooking");
const getBookingsOfLoggedInUser = require("./getBookingsOfLoggedInUser");

module.exports = {
  "/bookings/all": {
    ...getAllBookings,
  },
  "/bookings": {
    ...getBookings,
    ...createBooking,
  },
  "/bookings/{id}": {
    ...getBooking,
    ...deleteBooking,
  },
  "/bookings/{id}/cancel-booking": {
    ...cancelBooking,
  },
  "/auth/my-bookings": {
    ...getBookingsOfLoggedInUser,
  },
};
