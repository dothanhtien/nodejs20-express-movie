"use strict";
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

module.exports = {
  getTicketsByShowtimeId,
};
