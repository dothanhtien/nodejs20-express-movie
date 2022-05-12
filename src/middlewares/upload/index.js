"use strict";
const multer = require("multer");
const ApiError = require("../../utils/apiError");

const uploadImage = (folderName, fieldName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload/images/" + folderName);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
    },
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const isValid = new RegExp(
        "^.*.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$"
      ).test(file.originalname);

      if (isValid) {
        cb(null, true);
      } else {
        cb(new ApiError(400, "File is invalid"), false);
      }
    },
  });

  return upload.single(fieldName);
};

module.exports = {
  uploadImage,
};
