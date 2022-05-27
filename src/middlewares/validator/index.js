"use strict";
const { validationResult } = require("express-validator");

const customValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      value: error.value,
      message: error.msg,
    };
  },
});

const validate = (req, res, next) => {
  const errors = customValidationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = {
  validate,
};
