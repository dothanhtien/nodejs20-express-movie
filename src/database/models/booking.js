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
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.BookingDetail, {
        foreignKey: "bookingId",
        as: "bookingDetails",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.Ticket, {
        through: models.BookingDetail,
        foreignKey: "bookingId",
      });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
