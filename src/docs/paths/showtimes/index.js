const getShowtimes = require("./getShowtimes");
const createShowtime = require("./createShowtime");
const getShowtime = require("./getShowtime");
const deleteShowtime = require("./deleteShowtime");
const getShowtimesOfMovie = require("./getShowtimesOfMovie");

module.exports = {
  "/showtimes": {
    ...getShowtimes,
    ...createShowtime,
  },
  "/showtimes/{id}": {
    ...getShowtime,
    ...deleteShowtime,
  },
  "/movies/{id}/showtimes": {
    ...getShowtimesOfMovie,
  },
};
