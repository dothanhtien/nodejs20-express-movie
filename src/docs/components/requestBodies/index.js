const CinemaComplexFormData = require("./cinemaComplexFormData");
const CinemaForm = require("./cinemaForm");
const MovieFormData = require("./movieFormData");

const requestBodies = {
  ...CinemaComplexFormData,
  ...CinemaForm,
  ...MovieFormData,
};

module.exports = requestBodies;
