"use strict";
const express = require("express");
const authRouter = require("./auth");
const cinemaComplexRouter = require("./cinemaComplexes");
const cinemaRouter = require("./cinemas");
const movieRouter = require("./movies");
const userRouter = require("./users");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/movies", movieRouter);
rootRouter.use("/cinema-complexes", cinemaComplexRouter);
rootRouter.use("/cinemas", cinemaRouter);

module.exports = rootRouter;
