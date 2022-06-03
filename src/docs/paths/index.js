const auth = require("./auth");
const users = require("./users");
const cinemaComplexes = require("./cinemaComplexes");
const cinemas = require("./cinemas");
const screens = require("./screens");
const movies = require("./movies");
const showtimes = require("./showtimes");
const bookings = require("./bookings");

module.exports = {
  paths: {
    ...auth,
    ...users,
    ...cinemaComplexes,
    ...cinemas,
    ...screens,
    ...movies,
    ...showtimes,
    ...bookings,
  },
};
