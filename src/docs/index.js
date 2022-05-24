const basicInfo = require("./basicInfo");
const components = require("./components");
const security = require("./security");
const paths = require("./paths");

module.exports = {
  ...basicInfo,
  ...components,
  ...security,
  ...paths,
};
