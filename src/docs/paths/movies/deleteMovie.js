module.exports = {
  delete: {
    tags: ["Movies"],
    summary: "Delete a movie",
    security: [{ bearerAuth: [] }],
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
