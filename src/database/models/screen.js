"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Screen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cinema, { foreignKey: "cinemaId" });
      this.belongsToMany(models.Movie, { through: "Showtimes" });
      this.hasMany(models.Showtime, {
        foreignKey: "screenId",
        as: "showtimes",
      });
      this.hasMany(models.Seat, { foreignKey: "screenId", as: "screens" });
    }
  }
  Screen.init(
    {
      name: DataTypes.STRING,
      cinemaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Screen",
    }
  );
  return Screen;
};
