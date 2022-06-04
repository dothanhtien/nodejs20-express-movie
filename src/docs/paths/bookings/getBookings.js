module.exports = {
  get: {
    tags: ["Bookings"],
    summary: "Return a list of bookings with pagination",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "query",
        name: "page",
        description: "page",
        schema: {
          type: "integer",
        },
      },
      {
        in: "query",
        name: "limit",
        description: "limit",
        schema: {
          type: "integer",
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
