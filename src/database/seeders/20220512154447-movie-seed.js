"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Movies",
      [
        {
          name: "DOCTOR STRANGE IN THE MULTIVERSE OF MADNESS",
          description:
            "Stephen Strange sử dụng một phép thuật bị cấm mở ra cánh cửa đến đa vũ trụ, với sự giúp đỡ của các đồng minh thần bí cả cũ và mới, vượt qua thực tại để đối đầu với 1 kẻ thù mới, bí ẩn ,nguy hiểm và đáng sợ hơn",
          poster: "public/default/images/movies/doctor-strange.jpeg",
          trailer: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
          rating: 4.9,
          duration: 128,
          status: "now-showing",
          releaseDate: "2022-05-04",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "NGHỀ SIÊU DỄ",
          description:
            'Phim kể về một cảnh sát đã nghỉ hưu cùng các thanh niên "bất hảo" mua lại 1 quán ăn để làm nơi theo dõi tên trùm tội phạm. Tuy nhiên, quán bất ngờ nổi tiếng khiên cho phi vụ có nguy cơ đổ bể.',
          poster: "public/default/images/movies/nghe-sieu-de.jpeg",
          trailer: "https://www.youtube.com/watch?v=Nm0ImwyPaVE",
          rating: 4.9,
          duration: 113,
          status: "now-showing",
          releaseDate: "2022-04-29",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CHICKEN HARE AND THE HAMSTER OF DARKNESS",
          description:
            "Với cốt truyền đầy hài hước, hành động và bối cảnh hoành tráng Chickenhare And The Hamster là bộ phim hoạt hình phiêu lưu hoàn hảo dành cho gia đình dịp Hè 2022 này.",
          poster:
            "public/default/images/movies/chicken-hare-and-the-hamster-of-darkness.jpeg",
          trailer: "https://www.youtube.com/watch?v=w-P8nVYlXEs",
          rating: 5,
          duration: 91,
          status: "now-showing",
          releaseDate: "2022-04-29",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "URBAN MYTHS",
          description:
            "Tuyển tập truyền thuyết đô thị Seoul - khi những địa điểm, đồ vật quyen thuộc xung quanh chúng ta lại ẩn chứa những bí ẩn kinh hoàng khiến việc tồn tại ở hiện thực còn khiếp sợ hơn cái chết.",
          poster: "public/default/images/movies/urban-myths.jpeg",
          trailer: "https://www.youtube.com/watch?v=UreydwjeHbU",
          rating: 5,
          duration: 122,
          status: "now-showing",
          releaseDate: "2022-04-29",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HAUNTED TALES",
          description:
            "Một chiếc taxi cô đơn về nhà. Một khách sạn chứa đầy những linh hồn xấu xa. Một ngôi nhà vùng quê vang tiếng thì thầm. Nỗi sợ ẩn nấp khắp mọi ngọc ngách trong tuyển tập truyện ma này.",
          poster: "public/default/images/movies/haunted-tales.jpeg",
          trailer: "https://www.youtube.com/watch?v=oCTBSNkY6Ak",
          rating: 5,
          duration: 98,
          status: "now-showing",
          releaseDate: "2022-04-29",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "TOP GUN MAVERICK",
          description:
            'Sau hơn 30 năm phục vụ với tư cách là 1 trong những phi công hàng đầu của Hải quân, đại tá Pete "Maverick"có nhiệm vụ huấn luyện cho 1 nhóm phi công trẻ tiềm năng cho 1 nhiệm vụ "bất khả thi". Maverick sẽ phải làm gì để đảm bảo tất cả trở về an toàn?',
          poster: "public/default/images/movies/top-gun-maverick.jpeg",
          trailer: "https://www.youtube.com/watch?v=44CEx3MevyI",
          rating: 0,
          duration: 130,
          status: "coming-soon",
          releaseDate: "2022-05-27",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
