const getCinemaComplexes = require("./getCinemaComplexes");
const getCinemaComplex = require("./getCinemaComplex");

module.exports = {
  "/cinema-complexes": {
    ...getCinemaComplexes,
  },
  "/cinema-complexes/{id}": {
    ...getCinemaComplex,
  },
};
