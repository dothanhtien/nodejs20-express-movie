module.exports = {
  "/auth/sign-in": {
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
                      accessToken: {
                        type: "string",
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
