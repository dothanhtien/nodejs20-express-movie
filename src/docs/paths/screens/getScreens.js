module.exports = {
  get: {
    tags: ["Screens"],
    summary: "Return a list of screens and pagination",
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
