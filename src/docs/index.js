"use strict";
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = require("./swaggerDefinition");

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/routes/*/index.js"],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
