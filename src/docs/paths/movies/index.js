const createMovie = require("./createMovie");
const getMovies = require("./getMovies");
const getMovie = require("./getMovie");
const updateMovie = require("./updateMovie");
const deleteMovie = require("./deleteMovie");

module.exports = {
  "/movies": {
    ...createMovie,
    ...getMovies,
  },
  "/movies/{id}": {
    ...getMovie,
    ...updateMovie,
    ...deleteMovie,
  },
};
