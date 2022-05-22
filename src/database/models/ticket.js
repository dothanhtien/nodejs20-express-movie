"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Showtime, { foreignKey: "showtimeId" });
      this.belongsTo(models.Seat, { foreignKey: "seatId" });
      this.belongsToMany(models.Booking, {
        through: models.BookingDetail,
        foreignKey: "ticketId",
      });
    }
  }
  Ticket.init(
    {
      status: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      showtimeId: DataTypes.INTEGER,
      seatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
