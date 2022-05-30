const createBooking = require("./createBooking");
const getBookings = require("./getBookings");
const getBooking = require("./getBooking");
const deleteBooking = require("./deleteBooking");

module.exports = {
  "/bookings": {
    ...createBooking,
    ...getBookings,
  },
  "/bookings/{id}": {
    ...getBooking,
    ...deleteBooking,
  },
};
