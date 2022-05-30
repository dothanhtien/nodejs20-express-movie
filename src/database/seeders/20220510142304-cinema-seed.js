"use strict";
const { CinemaComplex } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    let cgvCinemas = [];
    let bhdCinemas = [];
    let galaxyCinemas = [];
    let lotteCinemas = [];
    let cineStarCinemas = [];
    let megaGsCinemas = [];

    const cgvCinemaComplex = await CinemaComplex.findOne({
      where: {
        name: "CGV",
      },
    });

    if (cgvCinemaComplex) {
      cgvCinemas = [
        {
          name: "CGV Aeon Bình Tân",
          address:
            "Tầng 3, Trung tâm thương mại Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, phường Bình Trị Đông B, quận Bình Tân, TPHCM",
          phoneNumber: "1900 6017",
          rating: 5,
          description:
            "CGV Aeon Mall Bình Tân chính thức khai trương và đi vào hoạt động từ ngày 1/7/2016 tại tầng 3, nằm trong khu vực TTTM Aeon Mall Bình Tân, Quận Bình Tân, TP.Hồ Chí Minh với tổng diện tích sàn lên đến 114.000m2. Được trang bị 7 phòng chiếu hiện đại, đặc biệt là phòng chiếu starium laser, CGV Aeon Mall Bình Tân là một trong những cụm rạp lớn nhất của CJ CGV tại Việt Nam với hơn 1.200 ghế ngồ, hứa hẹn sẽ là một điểm sáng giải trí của người dân khu vực Bình Tân và khu vực lân cận. Với phòng chiếu Starium Laser, khán giả sẽ được thưởng thức các bộ phim tmột cách vô cùng sống động bởi sự kết hợp của công nghệ và các thiết bị chiếu phim tối tân nhất. Có Màn hình cong cao cấp với kích thước khổng lồ, bao phủ toàn bộ khu vực tiếp nhận hình ảnh từ máy chiếu, phối hợp nhịp nhàng cùng sơ đồ ghế ngồi, từ đó đem đến góc nhìn tốt nhất cho mọi vị trí trong phòng chiếu. Khi đến với CGV Aeon Mall Bình Tân, khán giả không chỉ được thưởng thức công nghệ chiếu phim hiện đại tại CGV, mà còn có cơ hội tận hưởng những dịch vụ đa dạng trong khu phức hợp TTTM Aeon Mall Bình Tân như siêu thị Aeon, các gian hàng mỹ phẩm, thời trang, nội thất, cùng các khu vực giải trí cực chất như: Vuvuzela Beer Club, Phòng Karaoke gia đình, khu vực vui chơi miễn phí cho trẻ em và khu ẩm thực với hơn 30 nhà hàng, quán ăn.",
          cinemaComplexId: cgvCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CGV Hùng Vương Plaza",
          address:
            "Tầng 7 | Hùng Vương Plaza 126 Hùng Vương Quận 5 Tp. Hồ Chí Minh",
          phoneNumber: "1900 6017",
          rating: 5,
          description:
            "Hùng Vương Plaza là một trong số ít những trung tâm mua sắm tiện nghi và sang trọng ở Việt Nam gồm 3 tầng mua sắm với các gian hàng cao cấp của Parkson, khu food court, nhà hàng, games video và bowling cùng các tiện ích giải trí khác. CGV Cinemas nằm ở tầng 7, trung tâm mua sắm Hùng Vương. Tại đây, bạn có thể sử dụng hoặc thang máy hoặc thang cuốn để lên tầng 7. Với hệ thống rạp hoành tráng, hiện đại, nhiều phòng chiếu với lịch chiếu linh hoạt đáp ứng đầy đủ nhu cầu của khán giả. Cụm rạp CGV Hùng Vương Plaza có 9 phòng chiếu phim, trong đó 3 phòng chiếu phim 3D và 6 phòng chiếu phim 2D được trang bị công nghệ chiếu phim hiện đại. Hơn thế, diện tích phòng chiếu vừa phải mang lại cảm giác dễ chịu khi xem phim, âm thanh cũng vì thế mà đạt được hiệu quả tốt nhất, không bị loãng như các phòng chiếu diện tích rộng. Hệ thống ghế ngồi được thiết kế để tạo điều kiện tốt nhất cho khán giả đối diện trực tiếp màn hình, không bị chéo góc khi xem. Ghế ngồi êm và dễ chịu giúp người xem thưởng thức tác phẩm điện ảnh trong tâm thế thoải mái nhất. Điều đặc biệt khiến cho CGV Hùng Vương được lựa chọn nhiều không chỉ bởi chất lượng dịch vụ mà còn bởi tính cập nhật. Những bộ phim mới nhất luôn được chiếu trước tại CGV Cinemas, bởi vậy khán giả không thể bỏ qua cơ hội thưởng thức mỗi bộ phim sớm nhất có thể.",
          cinemaComplexId: cgvCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const bhdCinemaComplex = await CinemaComplex.findOne({
      where: {
        name: "BHD Star Cineplex",
      },
    });

    if (bhdCinemaComplex) {
      bhdCinemas = [
        {
          name: "BHD Star Quang Trung",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Rạp chiếu phim BHD Star Quang Trung là một trong những cụm rạp hiện đại và được đầu tư với quy mô lớn nhất của hệ thống rạp chiếu phim BHD Star Cinema – hệ thống rạp chiếu phim có quy mô lớn nhất tại Việt Nam hiện nay. BHD Star Quang Trung tọa lạc tầng B1 và B2 của trung tâm thương mại Vincom, số 190 Quang Trung, Gò Vấp, thành phố Hồ Chí Minh. Rạp có tất cả 8 phòng chiếu phim với hơn 1000 ghế ngồi; trong đó có 2 phòng chiếu phim 3D và 6 phòng chiếu phim 2D. Do nằm trong khu thương mại phức hợp Vincom Center, khán giả đến đây không chỉ có thể thưởng thức những bom tấn hấp dẫn nhất Hollywood; khán giả còn có thể tham gia vào những hoạt động vui chơi, giải trí có trong trung tâm thương mại. Đây là một trong những ưu điểm khiến khán giả hâm mộ điện ảnh thường lựa chọn đến BHD Star Quang Trung vào dịp cuối tuần và những kỳ nghỉ lễ. Bên cạnh những tiện ích bên ngoài rạp chiếu phim, khi khán giả vào trong rạp còn được tận hưởng dịch vụ chất lượng bậc nhất với đội ngũ nhân viên phục vụ chuyên nghiệp và thân thiện. Tất cả những yếu tố trên chính là lý do giúp BHD Star Quang Trung phát triển mạnh mẽ và được khán giả ngày càng yêu thích.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Star Vincom Lê Văn Việt",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Rạp chiếu phim BHD Star Vincom Lê Văn Việt đóng đô tại tầng 4, tòa nhà Vincom Plaza Lê Văn Việt, số 50 Lê Văn Việt, quận 9, thành phố Hồ Chí Minh. Đây là một trong số những cụm rạp của hệ thống BHD Star Cinema có quy mô lớn nhất Sài Gòn. Khi nhắc đến rạp chiếu phim có quy mô lớn nhất tại thành phố mang tên Bác, không thể không nhắc đến rạp BHD Star Vincom Lê Văn Việt. Đây là rạp được đầu tư quy mô với hơn 6 phòng chiếu phim và hơn 1000 ghế ngồi phục vụ khán giả đến với rạp. Mặc dù số lượng ghế ngồi lớn, nhưng mỗi phòng chiếu phim đều được thiết kế thông thoáng và hợp lý, diện tích mỗi ghế đều tương đối rộng rãi để mang lại cảm giác thoải mái nhất cho khán giả khi ngồi trong rạp xem phim khoảng 2 tiếng đồng hồ. Hiện nay, rạp BHD Star Vincom Lê Văn Việt có cả phòng chiếu phim 3D và phòng chiếu 2D; có thể đáp ứng nhu cầu xem phần lớn các thể loại phim bom tấn hiện nay. Trong tương lai gần, rạp sẽ đầu tư trang bị phòng chiếu phim 4D để khán giả có thể trải nghiệm tất cả những cung bậc cảm xúc và trải nghiệm những cảm giác mạnh trong phim. BHD Star Vincom Lê Văn Việt – lựa chọn số 1 của các bạn trẻ Sài thành.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const galaxyCinemaComplex = await CinemaComplex.findOne({
      where: {
        name: "Galaxy Cinema",
      },
    });

    if (galaxyCinemaComplex) {
      galaxyCinemas = [
        {
          name: "Galaxy Huỳnh Tấn Phát",
          address:
            "Lầu 2, TTTM Coopmart, số 1362 Huỳnh Tấn Phát, khu phố 1, Phường Phú Mỹ, Quận 7, Tp.Hồ Chí Minh, Việt Nam",
          phoneNumber: "19002224",
          rating: 5,
          description:
            "Cụp rạp chiếu phim Galaxy Huỳnh Tấn Phát tọa lạc tại tầng tầng 2, siêu thị Coopmart, 80/4A Huỳnh Tấn Phát, Phường Phú Mỹ, Quận 7, TP Hồ Chí Minh và đã bắt đầu đi vào hoạt động từ tháng 10/2017. Galaxy Huỳnh Tấn Phát hứa hẹn sẽ trở thành địa điểm giải trí và trải nghiệm điện ảnh tuyệt vời dành cho những khán giả yêu điện ảnh tại thành phố Hồ Chí Minh và đặc biệt là các tín đồ mê điện ảnh tại Quận 7. Galaxy Huỳnh Tấn Phát được xây dựng tổng cộng 4 phòng chiếu hiện đại, tương đương 750 ghế ngồi cùng với hệ thống màn chiếu, máy chiếu, phòng chiếu cực kỳ tân tiến, mang lại hình ảnh săc nét, chân thực, đẹp mắt. Ngoài ra, rạp còn sử dụng hệ thống âm thanh Dolby 7.1 và hệ thống cách âm chuẩn quốc tế đảm bảo chất lượng âm thanh sống động nhất cho tất cả các bộ phim được trình chiếu tại đây. Mục tiêu của Galaxy Huỳnh Tấn Phát là giúp dân cư tại quận 7, thị trấn Nhà Bè và cả các khu vực lân cận có thêm nhiều sự lựa chọn vui chơi giải trí chất lượng và kinh tế. Với giá vé cực kỳ hợp lý cùng với không gian trẻ trung và đội ngũ nhân viên thân thiện, nhiệt tình,Galaxy Huỳnh Tấn Phát chắc chắn sẽ mang lại một trải nghiệm mới lạ và tuyệt vời.",
          cinemaComplexId: galaxyCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const lotteCinemaComplex = await CinemaComplex.findOne({
      where: {
        name: "Lotte Cinema",
      },
    });

    if (lotteCinemaComplex) {
      lotteCinemas = [
        {
          name: "Lotte Cộng Hòa",
          address:
            "Tầng 4, Pico Plaza, 20 Cộng Hòa, P.12, Q.Tân Bình, TP.HCM, Việt Nam",
          phoneNumber: "",
          rating: 5,
          description:
            "Nằm tọa lạc ngay tại mặt tiền đường Cộng Hòa, quận Tân Bình. Rạp Lotte Cinema Cộng Hòa là một trong những điểm đến thú vị nhất của các bạn trẻ Sài Gòn mỗi dịp cuối tuần và mỗi khi bom tấn mới ra mắt.",
          cinemaComplexId: lotteCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const cineStarCinemaComplex = await CinemaComplex.findOne({
      where: {
        name: "CineStar",
      },
    });

    if (cineStarCinemaComplex) {
      cineStarCinemas = [
        {
          name: "CineStar Hai Bà Trưng",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Cinestar Hai Bà Trưng là cụm rạp thứ 3 thuộc hệ thống Cinestar nằm ngay vị trí thuận lợi của Quận 1, tọa lạc ở 135 Hai Bà Trưng, phường Bến Nghé, quận 1, TP.Hồ Chí Minh. Cụm rạp Cinestar Hai Bà Trưng sở hữu tổng cộng 6 phòng chiếu tương đương 1100 ghế ngồi. Rạp được trang bị hệ thống màn chiếu, máy chiếu, phòng chiếu hiện đại với 100% nhập khẩu từ nước ngoài. Hệ thống âm thanh Dolby 7.1 và hệ thống cách âm chuẩn quốc tế đảm bảo chất lượng âm thanh sống động nhất cho từng thước phim bom tấn. Ngoài ra, Cinestar Cinema còn là một trong những Cụm Rạp Chiếu Phim được giới trẻ và đặc biệt là các bạn học sinh, sinh viên vô cùng yêu thích bởi giá vé rẻ và dịch vụ cao cấp. Với một không gian giải trí rộng lớn, hiện đại, Cinestar Hai Bà Trưng hứa hẹn sẽ trở thành một địa điểm quen thuộc với giới trẻ thành phố Hồ Chí Minh.",
          cinemaComplexId: cineStarCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    const megaGsCinemaComplex = await CinemaComplex.findOne({
      where: {
        name: "Mega GS",
      },
    });

    if (megaGsCinemaComplex) {
      megaGsCinemas = [
        {
          name: "Mega GS Cao Thắng",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Rạp chiếu phim Mega GS Cao Thắng là cụm rạp chiếu phim đẳng cấp duy nhất chỉ có 1 rạp tại thành phố Hồ Chí Minh hiện nay. Đi vào hoạt động chính thức từ tháng 8/2015, Mega GS Cao Thắng đã nhanh chóng trở thành địa điểm giải trí lý tưởng của giới trẻ. Không giống như các hệ thống rạp chiếu phim khác trải dài trên khắp các tỉnh thành trong cả nước. Rạp Mega GS hiện tại chỉ có một cụm rạp duy nhất, chính vì vậy rạp được đầu tư hệ thống trang thiết bị hiện đại bậc nhất và đội ngũ nhân viên chuyên nghiệp, tận tình và chu đáo. Rạo có tất cả 6 phòng chiếu phim, với 2 phòng chiếu phim 3D và 4 phòng chiếu phim 2D. 6 phòng chiếu với hơn 1000 ghế ngồi dành cho khán giả; ghế ngồi được thiết kế thoải mái, đảm bảo khán đủ góc nhìn để thưởng thức phim. Ngoài ra, rạp Mega GS Cao Thắng được trang bị hệ thống âm thanh và hình ảnh cao cấp với âm thanh còm Dolby 7.1 và công nghệ trình chiếu 3D mới nhất. Đặc biệt tại dãy ghế VIP, rạp trang bị hệ thống cảm ứng âm thanh đặc biệt. Điều này chắc chắn sẽ mang đến cho khán giả những trải nghiệm vô cùng khác biệt.",
          cinemaComplexId: megaGsCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    await queryInterface.bulkInsert("Cinemas", [
      ...cgvCinemas,
      ...bhdCinemas,
      ...galaxyCinemas,
      ...lotteCinemas,
      ...cineStarCinemas,
      ...megaGsCinemas,
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cinemas", null, {});
  },
};
