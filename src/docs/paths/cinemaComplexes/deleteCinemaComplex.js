module.exports = {
  delete: {
    tags: ["Cinema complexes"],
    summary: "Delete a cinema complex",
    security: [{ bearerAuth: [] }],
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
