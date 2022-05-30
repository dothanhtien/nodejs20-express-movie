const schemas = require("./schemas");
const securitySchemes = require("./securitySchemes");
const requestBodies = require("./requestBodies");

module.exports = {
  components: {
    schemas,
    securitySchemes,
    requestBodies,
  },
};
