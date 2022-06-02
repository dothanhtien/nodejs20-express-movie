"use strict";
const { Op } = require("sequelize");
const { Ticket } = require("../../database/models");
const ApiError = require("../../utils/apiError");

const getTicketsByShowtimeId = async (showtimeId) => {
  try {
    const tickets = await Ticket.findAll({
      where: {
        showtimeId,
      },
    });

    return tickets;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

// example for ticketIds: [1, 2, 3]
const updateStatusOfTickets = async (status, ticketIds) => {
  try {
    const isUpdated = await Ticket.update(
      {
        status,
      },
      {
        where: {
          id: {
            [Op.in]: ticketIds,
          },
        },
      }
    );

    return isUpdated[0] === ticketIds.length;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

const updatePriceOfTicketsByShowtimeId = async (price, showtimeId) => {
  try {
    const count = await Ticket.count({
      where: {
        showtimeId,
      },
    });

    const isUpdated = await Ticket.update(
      {
        price,
      },
      {
        where: {
          showtimeId,
        },
      }
    );

    return isUpdated[0] === count;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal server error");
  }
};

module.exports = {
  getTicketsByShowtimeId,
  updateStatusOfTickets,
  updatePriceOfTicketsByShowtimeId,
};
