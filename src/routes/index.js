"use strict";
const express = require("express");
const authRouter = require("./auth");
const userRouter = require("./users");

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);

module.exports = rootRouter;
