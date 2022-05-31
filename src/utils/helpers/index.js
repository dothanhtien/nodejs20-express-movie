"use strict";
const parseBoolean = (booleanString) =>
  booleanString ? booleanString.toLowerCase() === "true" : false;

module.exports = {
  parseBoolean,
};
