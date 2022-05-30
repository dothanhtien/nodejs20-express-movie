module.exports = {
  post: {
    tags: ["Movies"],
    summary: "Create a movie",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            $ref: "#/components/requestBodies/MovieFormData",
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
