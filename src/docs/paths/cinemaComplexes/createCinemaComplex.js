module.exports = {
  post: {
    tags: ["Cinema complexes"],
    summary: "Create a cinema complex",
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            $ref: "#/components/requestBodies/CinemaComplexFormData",
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
