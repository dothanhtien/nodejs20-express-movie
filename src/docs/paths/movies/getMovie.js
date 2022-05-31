module.exports = {
  get: {
    tags: ["Movies"],
    summary: "Represents a movie",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Movie ID",
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
