const auth = require("./auth");
const users = require("./users");
const movies = require("./movies");
const showtimes = require("./showtimes");
const bookings = require("./bookings");

module.exports = {
  paths: {
    ...auth,
    ...users,
    ...movies,
    ...showtimes,
    ...bookings,
  },
};
