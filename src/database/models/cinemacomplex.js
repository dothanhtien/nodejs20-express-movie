"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CinemaComplex extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cinema, {
        foreignKey: "cinemaComplexId",
        as: "cinemas",
      });
    }
  }
  CinemaComplex.init(
    {
      name: DataTypes.STRING,
      logo: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("logo");
          return rawValue ? `${process.env.BASE_URL}/${rawValue}` : null;
        },
      },
    },
    {
      sequelize,
      modelName: "CinemaComplex",
    }
  );
  return CinemaComplex;
};
