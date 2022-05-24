const getMe = require("./getMe");
const signIn = require("./signIn");
const signUp = require("./signUp");

module.exports = {
  ...signIn,
  ...signUp,
  ...getMe,
};
