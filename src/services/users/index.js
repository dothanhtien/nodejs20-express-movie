"use strict";
const { Op } = require("sequelize");
const { body } = require("express-validator");
const { User } = require("../../database/models");
const ApiError = require("../../utils/apiError");
const { getPagingData, getPagination } = require("../pagination");

const validateCreateUserSchema = () => {
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
    body("firstName")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("First name exceeds 255 characters"),
    body("lastName")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Last name exceeds 255 characters"),
    body("phoneNumber")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 30 })
      .withMessage("Phone number exceeds 30 characters"),
    body("dateOfBirth")
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage("Date of birth is invalid"),
  ];
};

const validateUpdateUserSchema = () => {
  return [
    body("email")
      .optional({ nullable: true })
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid")
      .isLength({ max: 255 })
      .withMessage("Email exceeds 255 characters"),
    body("password")
      .optional({ nullable: true })
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .isLength({ max: 255 })
      .withMessage("Password exceeds 255 characters"),
    body("firstName")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("First name exceeds 255 characters"),
    body("lastName")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 255 })
      .withMessage("Last name exceeds 255 characters"),
    body("phoneNumber")
      .optional({ nullable: true })
      .trim()
      .isLength({ max: 30 })
      .withMessage("Phone number exceeds 30 characters"),
    body("dateOfBirth")
      .optional({ checkFalsy: true })
      .isISO8601()
      .withMessage("Date of birth is invalid"),
  ];
};

const checkUserExistsByEmail = async (email) => {
  try {
    const count = await User.count({
      where: {
        email,
      },
    });

    return count > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const checkUserExistsById = async (id) => {
  try {
    const count = await User.count({
      where: {
        id,
      },
    });

    return count > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const createUser = async (data) => {
  try {
    const user = await User.create(data);

    return user;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getUsers = async (email) => {
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  try {
    const users = await User.findAll({
      where: condition,
    });

    return users;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getUsersWithPagination = async (email, page, size) => {
  const condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await User.findAndCountAll({
      where: condition,
      limit,
      offset,
    });

    return getPagingData(data, page, limit, "users");
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updateUser = async (data, id) => {
  try {
    const isUpdated = await User.update(data, {
      where: {
        id,
      },
    });

    return isUpdated[0] > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const deleteUserById = async (id) => {
  try {
    const isDeleted = await User.destroy({
      where: {
        id,
      },
    });

    return isDeleted > 0;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

module.exports = {
  validateCreateUserSchema,
  validateUpdateUserSchema,
  checkUserExistsByEmail,
  checkUserExistsById,
  createUser,
  getUsers,
  getUsersWithPagination,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUserById,
};
