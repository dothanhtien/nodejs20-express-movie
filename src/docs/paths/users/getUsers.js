module.exports = {
  get: {
    tags: ["Users"],
    summary: "Return a list of users",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
