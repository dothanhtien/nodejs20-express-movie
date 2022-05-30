const getMe = require("./getMe");
const signIn = require("./signIn");
const signUp = require("./signUp");

module.exports = {
  "/auth/sign-in": {
    ...signIn,
  },
  "/auth/sign-up": {
    ...signUp,
  },
  "/auth/me": {
    ...getMe,
  },
};
