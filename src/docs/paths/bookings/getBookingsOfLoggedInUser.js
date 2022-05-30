module.exports = {
  get: {
    tags: ["Bookings"],
    summary: "Return a list of bookings of logged in user",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
