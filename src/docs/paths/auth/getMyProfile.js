module.exports = {
  get: {
    tags: ["Auth"],
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
