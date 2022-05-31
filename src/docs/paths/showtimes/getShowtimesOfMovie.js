module.exports = {
  get: {
    tags: ["Showtimes"],
    summary: "Return a list of showtimes filter by movie ID",
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
