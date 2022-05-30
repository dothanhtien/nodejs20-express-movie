module.exports = {
  post: {
    tags: ["Bookings"],
    summary: "Create a booking",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              showtimeId: {
                type: "integer",
                example: "1",
              },
              tickets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    ticketId: {
                      type: "integer",
                    },
                  },
                },
                example: [
                  {
                    ticketId: 1,
                  },
                  {
                    ticketId: 2,
                  },
                ],
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
