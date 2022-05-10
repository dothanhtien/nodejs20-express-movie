"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.CinemaComplex, { foreignKey: "cinemaComplexId" });
    }
  }
  Cinema.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      cinemaComplexId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};
