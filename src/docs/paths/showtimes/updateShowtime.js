module.exports = {
  put: {
    tags: ["Showtimes"],
    summary: "Update a showtime",
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
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              movieId: {
                type: "integer",
                example: "1",
              },
              screenId: {
                type: "integer",
                example: "1",
              },
              startTime: {
                type: "string",
                format: "date-time",
                example: "2022-06-01 10:00:00",
              },
              price: {
                type: "integer",
                example: 75000,
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
