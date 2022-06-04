const getAllCinemas = require("./getAllCinemas");
const getCinemas = require("./getCinemas");
const createCinema = require("./createCinema");
const getCinema = require("./getCinema");
const updateCinema = require("./updateCinema");
const deleteCinema = require("./deleteCinema");

module.exports = {
  "/cinemas/all": {
    ...getAllCinemas,
  },
  "/cinemas": {
    ...getCinemas,
    ...createCinema,
  },
  "/cinemas/{id}": {
    ...getCinema,
    ...updateCinema,
    ...deleteCinema,
  },
};
