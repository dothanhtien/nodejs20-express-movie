"use strict";
const express = require("express");
const {
  validateCreateUserSchema,
  validateUpdateUserSchema,
  checkUserExistsByEmail,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../../services/users");
const { hashPassword } = require("../../services/auth");
const ApiError = require("../../utils/apiError");
const { authenticate } = require("../../middlewares/auth");
const { validate } = require("../../middlewares/validator");

const userRouter = express.Router();

userRouter.post(
  "/",
  [authenticate, validateCreateUserSchema(), validate],
  async (req, res, next) => {
    let {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      role,
    } = req.body;

    if (!dateOfBirth) {
      dateOfBirth = null;
    }

    // check if logged in user is admin
    if (role !== "admin" || (role === "admin" && req.user.role !== "admin")) {
      role = "user";
    }

    try {
      const isExist = await checkUserExistsByEmail(email);
      if (isExist) {
        throw new ApiError(400, "User already exists");
      }

      const hashedPassword = hashPassword(password);

      const user = await createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        dateOfBirth,
        role,
      });

      if (!user) {
        throw new ApiError(500, "An error occurred while creating user");
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

userRouter.get("/", [authenticate], async (req, res, next) => {
  try {
    const users = await getUsers();

    res.json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    res.json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
});

userRouter.put(
  "/:id",
  [authenticate, validateUpdateUserSchema(), validate],
  async (req, res, next) => {
    const { id } = req.params;
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth } =
      req.body;
    const updates = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
    };

    try {
      const user = await getUserById(id);
      if (!user) {
        throw new ApiError(404, "User does not exist");
      }

      if (email) {
        const isExist = await checkUserExistsByEmail(email);
        // skip this statement if no change in the email
        if (user.email !== email && isExist) {
          throw new ApiError(400, "Updated email already exists");
        }
      } else {
        updates.email = user.email;
      }

      if (!updates.password) {
        // prevent error from db when saving password = null
        delete updates.password;
      } else {
        updates.password = hashPassword(updates.password);
      }

      const isUpdated = await updateUser(updates, id);
      if (!isUpdated) {
        throw new ApiError(500, "Internal server error");
      }

      // remove undefined properties to include in the response
      Object.keys(updates).forEach((key) => {
        if (updates[key] === undefined) {
          delete updates[key];
        }
      });

      // delete password property to make it is not present in response data
      delete user.dataValues.password;
      delete updates.password;

      res.json({
        status: "success",
        data: {
          user: {
            ...user.dataValues,
            ...updates,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete("/:id", [authenticate], async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    if (req.user.id === user.id) {
      throw new ApiError(
        400,
        "This action is not allowed, a user cannot self-delete"
      );
    }

    if (req.user.role === "user" && user.role === "admin") {
      throw new ApiError(403, "You don't have permission to delete this user");
    }

    const isDeleted = await deleteUserById(id);
    if (!isDeleted) {
      throw new ApiError(500, "An error occurred while deleting user");
    }

    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
