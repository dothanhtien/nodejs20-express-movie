module.exports = {
  post: {
    tags: ["Showtimes"],
    summary: "Create a showtime",
    security: [{ bearerAuth: [] }],
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
