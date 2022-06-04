module.exports = {
  put: {
    tags: ["Cinemas"],
    summary: "Update a cinema",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Cinema ID",
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
            $ref: "#/components/requestBodies/CinemaForm",
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
