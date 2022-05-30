"use strict";
const { query } = require("express-validator");

const validatePagingQueries = () => {
  return [
    query("page")
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage("Page query param should be a number")
      .isInt({ min: 1 })
      .withMessage("Page query param should be greater than or equal to 0"),
    query("limit")
      .optional({ checkFalsy: true })
      .isInt()
      .withMessage("Limit query param should be a number")
      .isInt({ min: 1 })
      .withMessage("Limit query param should be greater than or equal to 0"),
  ];
};

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 1;

  return { limit, offset };
};

const getPagingData = (pagingData, page, limit, nameOfList = "data") => {
  const { count: totalItems, rows } = pagingData;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    [nameOfList]: rows,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
    },
  };
};

module.exports = {
  validatePagingQueries,
  getPagination,
  getPagingData,
};
