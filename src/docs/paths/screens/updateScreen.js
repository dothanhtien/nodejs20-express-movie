module.exports = {
  put: {
    tags: ["Screens"],
    summary: "Update a screen",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Screen ID",
        schema: {
          type: "integer",
          minimum: 1,
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Screen 1",
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
