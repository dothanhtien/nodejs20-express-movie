"use strict";
const express = require("express");

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = rootRouter;
