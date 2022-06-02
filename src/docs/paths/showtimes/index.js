const getShowtimes = require("./getShowtimes");
const createShowtime = require("./createShowtime");
const getShowtime = require("./getShowtime");
const updateShowtime = require("./updateShowtime");
const deleteShowtime = require("./deleteShowtime");
const getShowtimesOfMovie = require("./getShowtimesOfMovie");

module.exports = {
  "/showtimes": {
    ...getShowtimes,
    ...createShowtime,
  },
  "/showtimes/{id}": {
    ...getShowtime,
    ...updateShowtime,
    ...deleteShowtime,
  },
  "/movies/{id}/showtimes": {
    ...getShowtimesOfMovie,
  },
};
