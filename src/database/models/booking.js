"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "SET NULL",
      });
      this.hasMany(models.BookingDetail, {
        foreignKey: "bookingId",
        as: "bookingDetails",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.Ticket, {
        through: models.BookingDetail,
        foreignKey: "bookingId",
        as: "tickets",
      });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      isCancelled: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
