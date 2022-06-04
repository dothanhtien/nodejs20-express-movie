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
  getUsersWithPagination,
} = require("../../services/users");
const { hashPassword } = require("../../services/auth");
const { validatePagingQueries } = require("../../services/pagination");
const ApiError = require("../../utils/apiError");
const { authenticate } = require("../../middlewares/auth");
const { catchRequestError } = require("../../middlewares/validator");

const userRouter = express.Router();

userRouter.post(
  "/",
  [authenticate, validateCreateUserSchema(), catchRequestError],
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

userRouter.get("/all", [authenticate], async (req, res, next) => {
  const { email } = req.query;

  try {
    const users = await getUsers(email);
    if (!users) {
      throw new ApiError(500, "An error occurred while fetching the users");
    }

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

userRouter.get(
  "/",
  [authenticate, validatePagingQueries(), catchRequestError],
  async (req, res, next) => {
    const { email, page, limit } = req.query;

    try {
      const data = await getUsersWithPagination(email, page, limit);
      if (!data) {
        throw new ApiError("An error occurred while fetching the users");
      }

      res.json({
        status: "success",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
);

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
  [authenticate, validateUpdateUserSchema(), catchRequestError],
  async (req, res, next) => {
    const { id } = req.params;
    const updates = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      dateOfBirth: req.body.dateOfBirth,
      role: req.body.role,
    };

    try {
      const user = await getUserById(id);
      if (!user) {
        throw new ApiError(404, "User does not exist");
      }

      if (req.user.role === "user" && user.role === "admin") {
        throw new ApiError(
          403,
          "You don't have permission to update the admin"
        );
      }

      if (
        req.user.role === "user" &&
        user.role === "user" &&
        updates.role === "admin"
      ) {
        throw new ApiError(
          403,
          "You don't have permission to update this user to admin"
        );
      }

      if (updates.email) {
        const isExist = await checkUserExistsByEmail(updates.email);
        // skip this statement if no change in the email
        if (user.email !== updates.email && isExist) {
          throw new ApiError(400, "Updated email already exists");
        }
      } else {
        delete updates.email;
      }

      if (!updates.password) {
        delete updates.password;
      } else {
        updates.password = hashPassword(updates.password);
      }

      if (!updates.dateOfBirth) {
        delete updates.dateOfBirth;
      }

      const isUpdated = await updateUser(updates, id);
      if (!isUpdated) {
        throw new ApiError(500, "An error occurred while updating the user");
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
      throw new ApiError(500, "An error occurred while deleting the user");
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
