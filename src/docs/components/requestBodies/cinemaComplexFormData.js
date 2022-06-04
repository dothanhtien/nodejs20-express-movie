module.exports = {
  CinemaComplexFormData: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Test Cinema Complex",
      },
      logo: {
        type: "string",
        format: "binary",
      },
    },
  },
};
