module.exports = {
  get: {
    tags: ["Auth"],
    security: [{ bearerAuth: [] }],
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
};
