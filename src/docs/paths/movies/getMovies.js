module.exports = {
  get: {
    tags: ["Movies"],
    summary: "Return a list of movies and pagination",
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
        name: "name",
        description: "name",
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
