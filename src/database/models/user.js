"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const columns = Object.assign({}, this.get());
      delete columns.password;

      return columns;
    }

    static associate(models) {
      this.hasMany(models.Booking, { foreignKey: "userId", as: "bookings" });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
