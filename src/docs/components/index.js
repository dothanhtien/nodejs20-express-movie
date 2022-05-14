const securitySchemes = require("./securitySchemes");
const User = require("./user");
module.exports = {
  components: {
    schemas: {
      ...User,
    },
    securitySchemes,
  },
};
