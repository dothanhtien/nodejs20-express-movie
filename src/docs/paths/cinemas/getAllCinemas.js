module.exports = {
  get: {
    tags: ["Cinemas"],
    summary: "Return all cinemas",
    parameters: [
      {
        in: "query",
        name: "name",
        description: "name",
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
