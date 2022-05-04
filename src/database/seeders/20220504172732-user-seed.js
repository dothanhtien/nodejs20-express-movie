"use strict";
const { hashPassword } = require("../../services/auth");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@example.com",
          password: hashPassword("11111111"),
          firstName: "Admin",
          lastName: "User",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "user@example.com",
          password: hashPassword("11111111"),
          firstName: "Normal",
          lastName: "User",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
