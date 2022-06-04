module.exports = {
  get: {
    tags: ["Users"],
    summary: "Return a list of users with pagination",
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
      {
        in: "query",
        name: "email",
        description: "email",
        schema: {
          type: "string",
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
