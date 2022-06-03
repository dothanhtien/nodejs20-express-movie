module.exports = {
  post: {
    tags: ["Screens"],
    summary: "Create a screen",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Screen 3",
              },
              cinemaId: {
                type: "integer",
                example: 1,
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
