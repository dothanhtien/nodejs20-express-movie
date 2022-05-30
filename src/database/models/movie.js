"use strict";
require("dotenv").config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Screen, { through: "Showtimes" });
      this.hasMany(models.Showtime, { foreignKey: "movieId", as: "showtimes" });
    }
  }
  Movie.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      poster: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("poster");
          if (process.env.NODE_ENV === "production") {
            return rawValue ? rawValue : null;
          } else {
            return rawValue ? `${process.env.BASE_URL}/${rawValue}` : null;
          }
        },
      },
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
