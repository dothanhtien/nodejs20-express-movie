"use strict";
const express = require("express");
const { sequelize } = require("./src/database/models");
const rootRouter = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// parse incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

// parse incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: true }));

app.use("/api", rootRouter);

app.use(errorHandler);

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
