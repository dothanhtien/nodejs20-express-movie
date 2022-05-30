"use strict";
require("dotenv").config();
const fs = require("fs");
const { cloudinary } = require("../../configs/cloudinary");
const ApiError = require("../apiError");

const ignoredFiles = [
  `${process.env.BASE_URL}/public/default/images/cinemaComplexes/cgv.jpeg`,
  `${process.env.BASE_URL}/public/default/images/cinemaComplexes/bhd-cineplex.png`,
  `${process.env.BASE_URL}/public/default/images/cinemaComplexes/galaxy-cinema.png`,
  `${process.env.BASE_URL}/public/default/images/cinemaComplexes/lotte-cinema.png`,
  `${process.env.BASE_URL}/public/default/images/cinemaComplexes/cine-star.png`,
  `${process.env.BASE_URL}/public/default/images/cinemaComplexes/mega-gs.png`,
  `${process.env.BASE_URL}/public/default/images/movies/doctor-strange.jpeg`,
  `${process.env.BASE_URL}/public/default/images/movies/nghe-sieu-de.jpeg`,
  `${process.env.BASE_URL}/public/default/images/movies/chicken-hare-and-the-hamster-of-darkness.jpeg`,
  `${process.env.BASE_URL}/public/default/images/movies/urban-myths.jpeg`,
  `${process.env.BASE_URL}/public/default/images/movies/haunted-tales.jpeg`,
  `${process.env.BASE_URL}/public/default/images/movies/top-gun-maverick.jpeg`,
];

const removeFile = async (path) => {
  try {
    if (ignoredFiles.includes(path)) {
      return;
    }

    if (process.env.NODE_ENV === "production") {
      const public_id =
        (process.env.CLOUDINARY_FOLDER_NAME
          ? process.env.CLOUDINARY_FOLDER_NAME + "/"
          : "") +
        path.split("/").reverse()[0].split(".").slice(0, -1).join(".");

      await cloudinary.uploader.destroy(public_id, function (err, result) {
        console.log(result);
      });
    } else {
      path = path.replace(process.env.BASE_URL + "/", "");

      fs.unlinkSync(path);
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "An error occurred while removing file");
  }
};

module.exports = removeFile;
