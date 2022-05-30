const User = require("./user");
const Movie = require("./movie");
const CinemaComplex = require("./cinemaComplex");
const Cinema = require("./cinema");

const schemas = {
  ...User,
  ...Movie,
  ...CinemaComplex,
  ...Cinema,
};

module.exports = schemas;
