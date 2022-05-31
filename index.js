"use strict";
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const { sequelize } = require("./src/database/models");
const rootRouter = require("./src/routes");
const swaggerSpec = require("./src/docs");

const app = express();

// parse incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

// parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", rootRouter);

app.use((err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "error",
    message,
  });
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
