"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const {
  getUserByEmail,
  validateCreateUserSchema,
  checkUserExistsByEmail,
  createUser,
} = require("../../services/users");
const {
  comparePassword,
  generateAccessToken,
  validateSignInSchema,
  hashPassword,
} = require("../../services/auth");
const ApiError = require("../../utils/apiError");
const { authenticate } = require("../../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/sign-in", validateSignInSchema(), async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError(400, "Email or password is invalid");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new ApiError(400, "Email or password is invalid");
    }

    const accessToken = generateAccessToken(user.id);

    res.json({
      status: "success",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  "/sign-up",
  validateCreateUserSchema(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.mapped(),
      });
    }

    const { firstName, lastName, email, password, phoneNumber, dateOfBirth } =
      req.body;

    try {
      const isExist = await checkUserExistsByEmail(email);
      if (isExist) {
        throw new ApiError(400, "Email already exists");
      }

      const hashedPassword = hashPassword(password);

      const user = await createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth,
        role: "user",
      });

      res.status(201).json({
        status: "success",
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get("/me", [authenticate], (req, res, next) => {
  try {
    res.json({
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
