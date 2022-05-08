"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CinemaComplexes",
      [
        {
          name: "CGV",
          logo: "public/default/images/cinemaComplexes/cgv.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Star Cineplex",
          logo: "public/default/images/cinemaComplexes/bhd-cineplex.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Galaxy Cinema",
          logo: "public/default/images/cinemaComplexes/galaxy-cinema.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lotte Cinema",
          logo: "public/default/images/cinemaComplexes/lotte-cinema.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CineStar",
          logo: "public/default/images/cinemaComplexes/cine-star.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mega GS",
          logo: "public/default/images/cinemaComplexes/mega-gs.png",
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
