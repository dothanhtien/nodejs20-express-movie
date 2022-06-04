module.exports = {
  put: {
    tags: ["Cinema complexes"],
    summary: "Update a cinema complex",
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        description: "Cinema complex ID",
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
