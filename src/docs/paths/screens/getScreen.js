module.exports = {
  get: {
    tags: ["Screens"],
    summary: "Represents a screen",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Screen ID",
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
