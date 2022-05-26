module.exports = {
  put: {
    tags: ["Users"],
    summary: "Update a user",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "User ID",
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
              email: {
                type: "string",
                example: "user@example.com",
              },
              password: {
                type: "string",
                example: "11111111",
              },
              firstName: {
                type: "string",
                example: "Normal",
              },
              lastName: {
                type: "string",
                example: "User",
              },
              phoneNumber: {
                type: "string",
                example: null,
              },
              dateOfBirth: {
                type: "string",
                format: "date",
                example: "2002-02-20",
              },
              role: {
                type: "string",
                example: "admin",
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
