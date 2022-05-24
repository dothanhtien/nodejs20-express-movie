"use strict";
const { getScreens } = require("../../services/screens");
module.exports = {
  async up(queryInterface, Sequelize) {
    const seatsTemplate = [];
    const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seatColumns = 12;
    for (const seatRow of seatRows) {
      for (let i = 1; i <= seatColumns; i++) {
        const seat = {
          name: seatRow + i,
        };
        seatsTemplate.push(seat);
      }
    }

    const seatsOfScreens = [];
    const screens = await getScreens();
    screens.forEach((screen) => {
      seatsTemplate.forEach((seat) => {
        seatsOfScreens.push({
          name: seat.name,
          screenId: screen.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert("Seats", seatsOfScreens, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Seats", null, {});
  },
};
