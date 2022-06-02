const createBooking = require("./createBooking");
const getBookings = require("./getBookings");
const getBooking = require("./getBooking");
const deleteBooking = require("./deleteBooking");
const cancelBooking = require("./cancelBooking");
const getBookingsOfLoggedInUser = require("./getBookingsOfLoggedInUser");

module.exports = {
  "/bookings": {
    ...createBooking,
    ...getBookings,
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
