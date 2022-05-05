"use strict";
const errorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = errorHandler;
