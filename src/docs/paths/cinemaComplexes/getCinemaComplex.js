module.exports = {
  get: {
    tags: ["Cinema complexes"],
    summary: "Represents a cinema complex",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Cinema complex ID",
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
