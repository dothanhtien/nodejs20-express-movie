const securitySchemes = require("./securitySchemes");
const User = require("./user");
const Movie = require("./movie");
const CinemaComplex = require("./cinemaComplex");
const Cinema = require("./cinema");
module.exports = {
  components: {
    schemas: {
      ...User,
      ...Movie,
      ...CinemaComplex,
      ...Cinema,
    },
    securitySchemes,
  },
};
