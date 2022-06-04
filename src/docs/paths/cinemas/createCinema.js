module.exports = {
  post: {
    tags: ["Cinemas"],
    summary: "Create a cinema",
    security: [{ bearerAuth: [] }],
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
