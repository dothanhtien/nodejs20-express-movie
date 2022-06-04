module.exports = {
  get: {
    tags: ["Showtimes"],
    summary: "Return a list of showtimes with pagination",
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
