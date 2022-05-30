const getShowtimes = require("./getShowtimes");
const createShowtime = require("./createShowtime");
const getShowtime = require("./getShowtime");
const deleteShowtime = require("./deleteShowtime");

module.exports = {
  "/showtimes": {
    ...getShowtimes,
    ...createShowtime,
  },
  "/showtimes/{id}": {
    ...getShowtime,
    ...deleteShowtime,
  },
};
