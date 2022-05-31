module.exports = {
  get: {
    tags: ["Cinema complexes"],
    summary: "Return a list of cinema complexes",
    parameters: [
      {
        in: "query",
        name: "includeCinemas",
        description: "includeCinemas",
        schema: {
          type: "boolean",
        },
      },
      {
        in: "query",
        name: "includeScreens",
        description: "includeScreens",
        schema: {
          type: "boolean",
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
