const signIn = require("./signIn");
const signUp = require("./signUp");
const getMyProfile = require("./getMyProfile");
const updateProfile = require("./updateProfile");

module.exports = {
  "/auth/sign-in": {
    ...signIn,
  },
  "/auth/sign-up": {
    ...signUp,
  },
  "/auth/my-profile": {
    ...getMyProfile,
  },
  "/auth/update-profile": {
    ...updateProfile,
  },
};
