"use strict";
const express = require("express");
const {
  getUserByEmail,
  validateCreateUserSchema,
  checkUserExistsByEmail,
  createUser,
  updateUser,
  validateUpdateUserSchema,
} = require("../../services/users");
const {
  comparePassword,
  generateAccessToken,
  validateSignInSchema,
  hashPassword,
} = require("../../services/auth");
const ApiError = require("../../utils/apiError");
const { authenticate } = require("../../middlewares/auth");
const { catchRequestError } = require("../../middlewares/validator");

const authRouter = express.Router();

authRouter.post(
  "/sign-in",
  [validateSignInSchema(), catchRequestError],
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
  [validateCreateUserSchema(), catchRequestError],
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

authRouter.get("/my-profile", [authenticate], (req, res, next) => {
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

authRouter.put(
  "/update-profile",
  [authenticate, validateUpdateUserSchema(), catchRequestError],
  async (req, res, next) => {
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
    };
    const { user } = req;

    try {
      if (updates.email) {
        const isExist = await checkUserExistsByEmail(updates.email);
        // skip this statement if no change in the email
        if (user.email !== updates.email && isExist) {
          throw new ApiError(400, "Updated email already exists");
        }
      }

      if (updates.password) {
        if (comparePassword(updates.password, user.password)) {
          delete updates.password;
        } else {
          updates.password = hashPassword(updates.password);
        }
      }

      // check if logged in user is admin
      if (
        updates.role !== "admin" ||
        (updates.role === "admin" && user.role !== "admin")
      ) {
        delete updates.role;
      }

      const isUpdated = await updateUser(updates, user.id);
      if (!isUpdated) {
        throw new ApiError(500, "An error occurred while updating profile");
      }

      await user.reload();

      res.json({
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
