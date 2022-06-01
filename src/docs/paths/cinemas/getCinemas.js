module.exports = {
  get: {
    tags: ["Cinemas"],
    summary: "Return a list of cinemas",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
