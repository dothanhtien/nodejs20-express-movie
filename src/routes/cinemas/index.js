"use strict";
const express = require("express");
const { authenticate, authorize } = require("../../middlewares/auth");
const { catchRequestError } = require("../../middlewares/validator");
const {
  getCinemas,
  getCinemaById,
  validateCreateCinemaSchema,
  checkCinemaExistsByName,
  createCinema,
  validateUpdateCinemaSchema,
  updateCinema,
  deleteCinemaById,
  getCinemasWithPagination,
} = require("../../services/cinemas");
const { validatePagingQueries } = require("../../services/pagination");
const ApiError = require("../../utils/apiError");

const cinemaRouter = express.Router();

cinemaRouter.post(
  "/",
  [
    authenticate,
    authorize("admin"),
    validateCreateCinemaSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
    const { name, address, phoneNumber, rating, description, cinemaComplexId } =
      req.body;

    try {
      const isExist = await checkCinemaExistsByName(name);
      if (isExist) {
        throw new ApiError(400, "Cinema name already exists");
      }

      const cinema = await createCinema({
        name,
        address,
        phoneNumber,
        rating,
        description,
        cinemaComplexId,
      });
      if (!cinema) {
        throw new ApiError(500, "An error occurred while creating the cinema");
      }

      await cinema.reload();

      res.status(201).json({
        status: "success",
        data: {
          cinema,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

cinemaRouter.get("/all", async (req, res, next) => {
  const { name } = req.query;

  try {
    const cinemas = await getCinemas(name);

    if (!cinemas) {
      throw new ApiError(500, "An error occurred while fetching the cinemas");
    }

    res.json({
      status: "success",
      data: {
        cinemas,
      },
    });
  } catch (error) {
    next(error);
  }
});

cinemaRouter.get(
  "/",
  [validatePagingQueries(), catchRequestError],
  async (req, res, next) => {
    const { name, page, limit } = req.query;

    try {
      const data = await getCinemasWithPagination(name, page, limit);

      if (!data) {
        throw new ApiError(500, "An error occurred while fetching the cinemas");
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

cinemaRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const cinema = await getCinemaById(id);

    if (!cinema) {
      throw new ApiError(404, "Cinema does not exist");
    }

    res.json({
      status: "success",
      data: {
        cinema,
      },
    });
  } catch (error) {
    next(error);
  }
});

cinemaRouter.put(
  "/:id",
  [
    authenticate,
    authorize("admin"),
    validateUpdateCinemaSchema(),
    catchRequestError,
  ],
  async (req, res, next) => {
    const { id } = req.params;
    const updates = {
      name: req.body.name,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      rating: req.body.rating,
      description: req.body.description,
      cinemaComplexId: req.body.cinemaComplexId,
    };

    try {
      const cinema = await getCinemaById(id);
      if (!cinema) {
        throw new ApiError(404, "Cinema does not exist");
      }

      const isUpdated = await updateCinema(updates, id);
      if (!isUpdated) {
        throw new ApiError(500, "An error occurred while updating the cinema");
      }

      await cinema.reload();

      res.json({
        status: "success",
        data: {
          cinema,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

cinemaRouter.delete(
  "/:id",
  [authenticate, authorize("admin")],
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const cinema = await getCinemaById(id);
      if (!cinema) {
        throw new ApiError(404, "Cinema does not exist");
      }

      const numOfScreens = await cinema.countScreens();
      if (numOfScreens > 0) {
        throw new ApiError(
          400,
          "Please delete the screens belonging to this cinema first"
        );
      }

      const isDeleted = await deleteCinemaById(id);
      if (!isDeleted) {
        throw new ApiError(500, "An error occurred while deleting the cinema");
      }

      res.json({
        status: "success",
        message: "Cinema deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = cinemaRouter;
