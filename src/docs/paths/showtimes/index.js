const getAllShowtimes = require("./getAllShowtimes");
const getShowtimes = require("./getShowtimes");
const createShowtime = require("./createShowtime");
const getShowtime = require("./getShowtime");
const updateShowtime = require("./updateShowtime");
const deleteShowtime = require("./deleteShowtime");
const getShowtimesOfCinemaComplexes = require("./getShowtimesOfCinemaComplexes");
const getShowtimesOfMovie = require("./getShowtimesOfMovie");

module.exports = {
  "/showtimes/all": {
    ...getAllShowtimes,
  },
  "/showtimes": {
    ...getShowtimes,
    ...createShowtime,
  },
  "/showtimes/{id}": {
    ...getShowtime,
    ...updateShowtime,
    ...deleteShowtime,
  },
  "/cinema-complexes/showtimes": {
    ...getShowtimesOfCinemaComplexes,
  },
  "/movies/{id}/showtimes": {
    ...getShowtimesOfMovie,
  },
};
