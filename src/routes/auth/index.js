"use strict";
const express = require("express");
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
const { validate } = require("../../middlewares/validator");

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  [validateSignInSchema(), validate],
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await getUserByEmail(email);
      if (!user) {
        throw new ApiError(400, "Email or password is invalid");
      }

      const isMatch = comparePassword(password, user.password);
      if (!isMatch) {
        throw new ApiError(400, "Email or password is invalid");
      }

      const accessToken = generateAccessToken(user.id);
      if (!accessToken) {
        throw new ApiError(
          500,
          "An error occurred while generating access token"
        );
      }

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
  }
);

authRouter.post(
  "/sign-up",
  [validateCreateUserSchema(), validate],
  async (req, res, next) => {
    let { firstName, lastName, email, password, phoneNumber, dateOfBirth } =
      req.body;

    if (!dateOfBirth) {
      dateOfBirth = null;
    }

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

      if (!user) {
        throw new ApiError(500, "An error occurred while signing up");
      }

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
      status: "success",
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/my-bookings", [authenticate], async (req, res, next) => {
  const { user } = req;

  try {
    const bookings = await user.getBookings({
      include: [
        {
          association: "tickets",
          as: "tickets",
          through: { attributes: [] },
        },
      ],
    });

    if (!bookings) {
      throw new ApiError(500, "An error occurred while fetching bookings");
    }

    res.json({
      status: "success",
      data: {
        user,
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
