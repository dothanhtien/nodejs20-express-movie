module.exports = {
  "/auth/sign-up": {
    post: {
      tags: ["Auth"],
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
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
