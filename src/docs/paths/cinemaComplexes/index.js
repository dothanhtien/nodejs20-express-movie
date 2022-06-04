const getCinemaComplexes = require("./getCinemaComplexes");
const createCinemaComplex = require("./createCinemaComplex");
const getCinemaComplex = require("./getCinemaComplex");
const updateCinemaComplex = require("./updateCinemaComplex");
const deleteCinemaComplex = require("./deleteCinemaComplex");

module.exports = {
  "/cinema-complexes": {
    ...getCinemaComplexes,
    ...createCinemaComplex,
  },
  "/cinema-complexes/{id}": {
    ...getCinemaComplex,
    ...updateCinemaComplex,
    ...deleteCinemaComplex,
  },
};
