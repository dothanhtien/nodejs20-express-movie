"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      showtimeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Showtimes",
          key: "id",
        },
      },
      seatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Seats",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
