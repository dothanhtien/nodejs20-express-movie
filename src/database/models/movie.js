"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      poster: DataTypes.STRING,
      trailer: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      duration: DataTypes.INTEGER,
      status: DataTypes.STRING,
      releaseDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
