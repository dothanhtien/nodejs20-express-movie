"use strict";
const bcrypt = require("bcryptjs");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth");

const validateSignInSchema = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .isLength({ max: 255 })
      .withMessage("Email exceeds 255 characters"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .isLength({ max: 255 })
      .withMessage("Password exceeds 255 characters"),
  ];
};

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);

  return isMatch;
};

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, authConfig.secret, {
    expiresIn: +authConfig.tokenExpiration,
  });

  return token;
};

module.exports = {
  validateSignInSchema,
  hashPassword,
  comparePassword,
  generateAccessToken,
};
