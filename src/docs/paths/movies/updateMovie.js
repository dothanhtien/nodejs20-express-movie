module.exports = {
  put: {
    tags: ["Movies"],
    summary: "Update a movie",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Movie ID",
        schema: {
          type: "integer",
          minimum: 1,
        },
      },
    ],
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
