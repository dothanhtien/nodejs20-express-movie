const getAllMovies = require("./getAllMovies");
const getMovies = require("./getMovies");
const createMovie = require("./createMovie");
const getMovie = require("./getMovie");
const updateMovie = require("./updateMovie");
const deleteMovie = require("./deleteMovie");

module.exports = {
  "/movies/all": {
    ...getAllMovies,
  },
  "/movies": {
    ...getMovies,
    ...createMovie,
  },
  "/movies/{id}": {
    ...getMovie,
    ...updateMovie,
    ...deleteMovie,
  },
};
