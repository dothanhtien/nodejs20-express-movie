"use strict";
const fs = require("fs");
const ApiError = require("../apiError");

const removeFile = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

module.exports = removeFile;
