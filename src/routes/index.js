"use strict";
const express = require("express");
const authRouter = require("./auth");
const movieRouter = require("./movies");
const userRouter = require("./users");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/movies", movieRouter);

module.exports = rootRouter;
