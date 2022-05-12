"use strict";
require("dotenv").config();

module.exports = {
  secret: process.env.JWT_SECRET,
  tokenExpiration: process.env.JWT_TOKEN_EXPIRATION,
};
