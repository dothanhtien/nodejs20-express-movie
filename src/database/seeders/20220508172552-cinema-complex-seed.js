"use strict";
require("dotenv").config();
module.exports = {
  async up(queryInterface, Sequelize) {
    let baseUrl = "";
    if (process.env.NODE_ENV === "development") {
      baseUrl = "";
    } else {
      baseUrl = process.env.BASE_URL + "/";
    }

    await queryInterface.bulkInsert(
      "CinemaComplexes",
      [
        {
          name: "CGV",
          logo: `${baseUrl}public/default/images/cinemaComplexes/cgv.jpeg`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Star Cineplex",
          logo: `${baseUrl}public/default/images/cinemaComplexes/bhd-cineplex.png`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Galaxy Cinema",
          logo: `${baseUrl}public/default/images/cinemaComplexes/galaxy-cinema.png`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lotte Cinema",
          logo: `${baseUrl}public/default/images/cinemaComplexes/lotte-cinema.png`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CineStar",
          logo: `${baseUrl}public/default/images/cinemaComplexes/cine-star.png`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mega GS",
          logo: `${baseUrl}public/default/images/cinemaComplexes/mega-gs.png`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CinemaComplexes", {}, {});
  },
};
