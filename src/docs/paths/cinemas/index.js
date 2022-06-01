const getCinemas = require("./getCinemas");
const getCinema = require("./getCinema");

module.exports = {
  "/cinemas": {
    ...getCinemas,
  },
  "/cinemas/{id}": {
    ...getCinema,
  },
};
