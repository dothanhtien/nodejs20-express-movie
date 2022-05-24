require("dotenv").config();

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Online Movie Ticket Booking System",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Development server",
    },
    {
      url: process.env.BASE_URL + "/api",
      description: "Production server",
    },
  ],
};
