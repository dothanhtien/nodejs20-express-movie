"use strict";
require("dotenv").config();

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Online Movie Ticket Booking System",
    version: "1.0.0",
  },
  servers: [
    {
      url: process.env.BASE_URL + "/api",
      description:
        process.env.NODE_ENV === "development"
          ? "Development server"
          : "Production server",
    },
  ],
};
