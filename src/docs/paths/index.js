const auth = require("./auth");
const users = require("./users");
const showtimes = require("./showtimes");
const bookings = require("./bookings");

module.exports = {
  paths: {
    ...users,
    ...auth,
    ...showtimes,
    ...bookings,
  },
};
