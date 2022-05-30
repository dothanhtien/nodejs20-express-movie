module.exports = {
  get: {
    tags: ["Showtimes"],
    summary: "Return a list of showtimes",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
