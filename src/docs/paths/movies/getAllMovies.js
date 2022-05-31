module.exports = {
  get: {
    tags: ["Movies"],
    summary: "Return all movies",
    security: [{ bearerAuth: [] }],
    parameters: [
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
