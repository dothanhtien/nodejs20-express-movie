module.exports = {
  get: {
    tags: ["Movies"],
    summary: "Return all movies",
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
