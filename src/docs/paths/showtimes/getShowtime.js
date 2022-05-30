module.exports = {
  get: {
    tags: ["Showtimes"],
    summary: "Represents a showtime",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Showtime ID",
        schema: {
          type: "integer",
          minimum: 1,
        },
      },
    ],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
