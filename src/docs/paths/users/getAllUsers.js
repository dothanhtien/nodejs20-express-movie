module.exports = {
  get: {
    tags: ["Users"],
    summary: "Return all users",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "query",
        name: "email",
        description: "email",
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      200: {
        description: "Success",
      },
    },
  },
};
