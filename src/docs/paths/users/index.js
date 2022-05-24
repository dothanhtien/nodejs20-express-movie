module.exports = {
  "/users": {
    get: {
      tags: ["Users"],
      summary: "Return a list of users",
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
    },
  },
};
