module.exports = {
  CinemaComplex: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "CGV",
      },
      logo: {
        type: "string",
        example:
          "http://localhost:8080/public/default/images/cinemaComplexes/cgv.jpeg",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};
