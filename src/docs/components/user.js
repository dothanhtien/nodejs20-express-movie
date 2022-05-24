module.exports = {
  User: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      firstName: {
        type: "string",
        example: "Admin",
      },
      lastName: {
        type: "string",
        example: "User",
      },
      email: {
        type: "string",
        example: "admin@example.com",
      },
      phoneNumber: {
        type: "string",
        example: null,
      },
      dateOfBirth: {
        type: "date",
        example: null,
      },
      role: {
        type: "string",
        example: "admin",
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
