module.exports = {
  get: {
    tags: ["Cinemas"],
    summary: "Represents a cinema",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Cinema ID",
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
