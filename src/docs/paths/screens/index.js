const getAllScreens = require("./getAllScreens");
const getScreens = require("./getScreens");
const createScreen = require("./createScreen");
const getScreen = require("./getScreen");
const updateScreen = require("./updateScreen");
const deleteScreen = require("./deleteScreen");

module.exports = {
  "/screens/get-all": {
    ...getAllScreens,
  },
  "/screens": {
    ...getScreens,
    ...createScreen,
  },
  "/screens/{id}": {
    ...getScreen,
    ...updateScreen,
    ...deleteScreen,
  },
};
