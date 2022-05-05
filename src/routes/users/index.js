"use strict";
const express = require("express");
const { validationResult } = require("express-validator");
const {
  validateCreateUserSchema,
  validateUpdateUserSchema,
  checkUserExistsByEmail,
  checkUserExistsById,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../../services/users");
const { hashPassword } = require("../../services/auth");
const ApiError = require("../../utils/apiError");

const userRouter = express.Router();

userRouter.post("/", validateCreateUserSchema(), async (req, res, next) => {
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
    });

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

/**
 * @swagger
 * /users:
 *   get:
 *     tags: ['Users']
 *     summary:
 *     description:
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           firstName:
 *                             type: string
 *                             example: Admin
 *                           lastName:
 *                             type: string
 *                             example: User
 *                           email:
 *                             type: string
 *                             example: admin@example.com
 *                           phoneNumber:
 *                             type: string
 *                             example: null
 *                           dateOfBirth:
 *                             type: date
 *                             example: null
 *                           role:
 *                             type: string
 *                             example: admin
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
userRouter.get("/", async (req, res, next) => {
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

userRouter.get("/:id", async (req, res, next) => {
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

userRouter.put("/:id", validateUpdateUserSchema(), async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }

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
});

userRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const isExist = await checkUserExistsById(id);

    if (!isExist) {
      throw new ApiError(404, "User does not exist");
    }

    const isDeleted = await deleteUserById(id);

    if (!isDeleted) {
      throw new ApiError(500, "Internal server error");
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
