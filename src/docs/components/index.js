const securitySchemes = require("./securitySchemes");
const User = require("./user");
const Movie = require("./movie");
module.exports = {
  components: {
    schemas: {
      ...User,
      ...Movie,
    },
    securitySchemes,
  },
};
