module.exports = {
  get: {
    tags: ["Bookings"],
    summary: "Return a list of bookings",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
