"use strict";
const express = require("express");
const authRouter = require("./auth");
const cinemaComplexRouter = require("./cinemaComplexes");
const cinemaRouter = require("./cinemas");
const movieRouter = require("./movies");
const screenRouter = require("./screens");
const showtimeRouter = require("./showtimes");
const userRouter = require("./users");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/movies", movieRouter);
rootRouter.use("/cinema-complexes", cinemaComplexRouter);
rootRouter.use("/cinemas", cinemaRouter);
rootRouter.use("/screens", screenRouter);
rootRouter.use("/showtimes", showtimeRouter);

module.exports = rootRouter;
