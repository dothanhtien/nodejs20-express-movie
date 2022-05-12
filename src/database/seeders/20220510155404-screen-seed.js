"use strict";
const { getCinemas } = require("../../services/cinemas");

module.exports = {
  async up(queryInterface, Sequelize) {
    const cinemas = await getCinemas();
    const screens = [];
    cinemas.forEach((cinema) => {
      for (let i = 1; i <= 6; i++) {
        screens.push({
          name: `Screen ${i}`,
          cinemaId: cinema.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert("Screens", screens);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Screens", null, {});
  },
};
