"use strict";
const fs = require("fs");

if (!fs.existsSync("./public/upload")) {
  fs.mkdirSync("./public/upload");
}

if (!fs.existsSync("./public/upload/images")) {
  fs.mkdirSync("./public/upload/images");
}

if (!fs.existsSync("./public/upload/images/cinemaComplexes")) {
  fs.mkdirSync("./public/upload/images/cinemaComplexes");
}

if (!fs.existsSync("./public/upload/images/movies")) {
  fs.mkdirSync("./public/upload/images/movies");
}
