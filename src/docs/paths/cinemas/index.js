const getAllCinemas = require("./getAllCinemas");
const getCinemas = require("./getCinemas");
const createCinema = require("./createCinema");
const getCinema = require("./getCinema");
const deleteCinema = require("./deleteCinema");

module.exports = {
  "/cinemas/get-all": {
    ...getAllCinemas,
  },
  "/cinemas": {
    ...getCinemas,
    ...createCinema,
  },
  "/cinemas/{id}": {
    ...getCinema,
    ...deleteCinema,
  },
};
