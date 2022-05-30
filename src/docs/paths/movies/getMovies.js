module.exports = {
  get: {
    tags: ["Movies"],
    summary: "Return a list of movies",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
