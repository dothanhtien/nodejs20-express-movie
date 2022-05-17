"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Booking, { foreignKey: "bookingId" });
      // this.hasMany(models.Ticket, { foreignKey: "ticketId", as: "tickets" });
    }
  }
  BookingDetails.init(
    {
      bookingId: DataTypes.INTEGER,
      ticketId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BookingDetails",
    }
  );
  return BookingDetails;
};
