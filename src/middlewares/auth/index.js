"use strict";
const jwt = require("jsonwebtoken");
const authConfig = require("../../configs/auth");
const ApiError = require("../../utils/apiError");
const { getUserById } = require("../../services/users");

const catchError = (error) => {
  if (error instanceof jwt.TokenExpiredError) {
    throw new ApiError(401, "Token has expired");
  }

  throw new ApiError(401, "Unauthorized");
};

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let decodedData = null;

    if (!token) {
      throw new ApiError(403, "No token provided");
    }

    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        catchError(error);
      }
      decodedData = decoded;
    });

    const user = await getUserById(decodedData.userId);
    if (!user) {
      throw new ApiError(401, "Invalid token. User does not exist");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
