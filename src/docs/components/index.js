const User = require("./user");
module.exports = {
  components: {
    schemas: {
      ...User,
    },
  },
};
