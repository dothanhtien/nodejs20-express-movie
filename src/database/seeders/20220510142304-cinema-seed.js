"use strict";
const { CinemaComplex } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    let cgvCinemas = [];
    let bhdCinemas = [];

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
          name: "CGV Crescent Mall",
          address:
            "Lầu 5, Crescent Mall Đại lộ Nguyễn Văn Linh, Phú Mỹ Hưng Quận 7 TP. Hồ Chí Minh",
          phoneNumber: "1900 6017",
          rating: 5,
          description:
            "Rạp CGV Crescent Mall toạ lạc tại tầng 5, trung tâm thương mại Crescent Mall, nằm ở bên cạnh Food Court và đối diện Game Center. CGV Crescent Mall là rạp chiếu phim mang tiêu chuẩn quốc tế về không gian, chỗ ngồi và cả hệ thống âm thanh, hình ảnh của CGV Cinemas. CGV Crescent Mall có hệ thống phòng chiếu mới và hiện đại bậc nhất với 8 phòng chiếu, hơn 1,200 ghế ngồi trên diện tích hơn 2000 m2. Chính sự rộng rãi đó đã mang lại một không gian hoàn toàn thoải mái cho khán giả khi đến đây thưởng thức điện ảnh. Hệ thống âm thanh kỹ thuật số 7.1 hỗ trợ tối đa cho các bộ phim, phiêu lưu tạo nên cảm giác sống động, chân thực. Ngoài ra, rạp không quá đông nên khách đến rạp có thể thoải mái, không phải chen chúc xếp hàng chờ mua vé hay bắp rang như các hệ thống rạp trong thành phố. Nhân viên phục vụ tận tình niềm nở cũng góp phần tạo ấn tượng tốt cho rạp CGV Crescent Mall. Như những rạp kết hợp trong tổ hợp thương mại khác, khán giả hoàn toàn có thể kết hợp buổi xem phim với shopping hoặc đi dạo trong mall, hay siêu thị Giant ở tầng dưới. Đặc biệt hơn, vị trí trên đại lộ Nguyễn Văn Linh với nhiều không gian thoáng, đẹp như Hồ Bán Nguyệt, cầu Ánh Sao biến CGV Crescent Mall thành địa điểm lý tưởng cho chuyến vui chơi cuối tuần. Bởi vậy, nhược điểm xa trung tâm của CGV Crescent Mall đôi lúc là một lợi thế khi bạn muốn vừa xem phim, vừa nghỉ ngơi, thoát khỏi không khí xô bồ phía trung tâm thành phố.",
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
          name: "BHD Star Cineplex ICON 68",
          address:
            "Tầng 3 và 4 Tòa nhà tài chính Bitexco, 2 Hải Triều, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
          phoneNumber: "",
          rating: 5,
          description:
            "Bạn đã biết đến toàn nhà Bitexco Financial Tower ICON 68 – tòa nhà hiện đại nhất, cao nhất và là biểu tượng mới nhất của thành phố mang tên Bác? Bạn có biết bên trong tòa nhà đó có chứa rạp chiếu phim BHD Star Cineplex ICON 68 đẹp nhất đất Sài Gòn. Vinh dự là rạp chiếu phim duy nhất đóng đô tại tòa nhà cao nhất thành phố Hồ Chí Minh – trung tâm thương mại ICON 68, số 2 Hải Triều, quận 1, thành phố Hồ Chí Minh. Rạp BHD Star Cineplex ICON 68 chiếm trọn tầng 3 và tầng 4 của tòa nhà với tổng cộng 7 phòng chiếu phim và hơn 800 ghế ngồi. Trong đó có 4 phòng chiếu phim 3D và 3 phòng chiếu phim 2D. BHD Star Cineplex ICON 68 là rạp chiếu phim có số phòng chiếu phim 3D cao nhất tại thành phố Hồ Chí Minh tính đến thời điểm hiện tại. Rạp chiếu phim được thiết kế bởi những kiến trức sư tài giỏi đến từ nước ngoài. Do vậy rạp mang đạm hơi thở của người dân phương Tây, hiện đại, phóng khoáng và vô cùng quyến rũ. Nhờ vậy khán giả đến với rạp không chỉ để theo dõi những bộ phim điện ảnh hấp dẫn, mà còn đến với rạp để có những bức hình selfie đẹp lung linh trên mạng xã hội.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Star Phạm Hùng",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Rạp chiếu phim BHD Star Phạm Hùng có đến hơn 1050 ghế ngồi dành cho khán giả. Đây là rạp chiếu phim có quy mô lớn nhất trong số các rạp chiếu phim tại thành phố Hồ Chí Minh phục vụ nhu cầu của khán giả yêu thích điện ảnh. BHD Star Phạm Hùng có tọa lạc trên tầng 4 của trung tâm thương mại Satra Phạm Hùng, C6/27 Phạm Hùng, Bình Chánh, thành phố Hồ Chí Minh. Rạp có tổng cộng 6 phòng chiếu phim, trong đó có 2 phòng chiếu dành cho những bộ phim 3D, 4 phòng chiếu còn lại là phòng chiếu phim 2D. Rạp chiếu phim BHD Star Phạm Hùng không chỉ có rất nhiều ghế ngồi phục vụ khán giả hâm mộ điện ảnh. Những ghế ngồi tại rạp đều được thiết kế rộng rãi và được làm từ chất liệu tốt nhất, mang lại cảm giác thoải mái cho khán giả trong suốt khoảng thời gian theo dõi bộ phim. Hệ thống rạp bao gồm ghế đôi dành cho tình nhân, ghế thường cho những bạn trẻ độc thân và ghế ngồi có chỗ đặt chân cho trẻ nhỏ. Ngoài ra, rạp còn được trang bị hệ thống âm thanh và hình ảnh hiện đại nhất hiện nay. Điều góp phần tăng thêm chất lượng của những bộ phim được chiếu tại rạp và thu hút được nhiều khán giả đến với rạp nhiều hơn.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
          name: "BHD Star Vincom 3/2",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Rạp chiếu phim BHD Star Vincom 3/2 tọa lạc tại lầu 4, siêu thị Vincom 3/2, 3C đường 3/2, quận 10, thành phố Hồ Chí Minh. Nằm ngày vị trí trung tâm nội thành, BHD Star Vincom 3/2 là lựa chọn hoàn hảo của những bạn trẻ đang sinh sống và làm việc tại quận 10. Nhằm phục vụ nhu cầu giải trí lớn của các bạn trẻ Sài Gòn, rạp đã trang bị 5 phòng chiếu phim với 666 ghế ngồi. 2 phòng chiếu phim 3D và 3 phòng chiếu phim 2D hoạt động liên tục từ 8 giờ sáng – 12 giờ đêm. Đảm bảo cho khán giả luôn có thể thưởng thức bất kỳ bộ phim nào mình mong muốn, vào bất cứ khung giờ nào trong ngày. BHD Star Vincom 3/2 cũng giống như các rạp khác trong hệ thống BHD Star Cinema, đều có khu vực riêng dành cho những nghệ sỹ Việt với mục đích tôn vinh những đóng góp của họ với nền nghệ thuật nước nhà, đặc biệt là đối với lĩnh vực điện ảnh. Tại các phòng chiếu phim đều được sắp xếp hàng ghế VIP dành cho các nghệ sỹ. Nhờ vậy BHD Star Vincom 3/2 nói riêng và BHD Star Cinema nói chung đã trở thành địa điểm lý tưởng của sao Việt khi có nhu cầu xem phim màn ảnh rộng.",
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
        {
          name: "BHD Star Vincom Thảo Điền",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Rạp chiếu phim BHD Star Vincom Thảo Điền chính thức đi vào hoạt động cuối năm 2015 và đã nhanh chóng trở thành địa điểm giải trí yêu thích của khán giả hâm mộ điện ảnh Sài Gòn. Rạp chiếu phim tọa lạc tại tầng 5 trung tâm thương mại Vincom, số 159 xa lộ Hà Nội, phường Thảo Điền, quận 2, thành phố Hồ Chí Minh. Rạo có tất cả 6 rạp chiếu phim với tổng diện tích tương đối rộng lớn. Vì vậy BHD Star Vincom Thảo Điền hoàn toàn có đủ khả năng phục vụ nhu cầu xem phim của khán giả vào những giờ cao điểm như cuối tuần hay khi có một bộ phim bom tấn mới ra mắt. Rạp chiếu phim BHD Star Vincom Thảo Điền được trang bị hệ thống âm thanh và màn hình siêu khủng. Khán giả không hề có cảm giác ù tai, đau đầu cho dù xem những bộ phim hành động hay kinh dị cảm giác mạnh. Đồng thời khán giả còn có cảm giác như chính mình là diễn viên của bộ phim với những thước phim sắc nét nhất. Ngoài ra, BHD Star Vincom Thảo Điền luôn có những chương trình khuyến mãi dành cho khán giả vào những kỳ nghỉ lễ. Vì vậy không khó để giải thích vì sao khán giả đến với rạp chiếu phim luôn đông đúc mỗi dịp cuối tuần và số lượng khán giả quay lại rạp ngày càng tăng.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Star Bitexco",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Bạn đã biết đến toàn nhà Bitexco Financial Tower ICON 68 – tòa nhà hiện đại nhất, cao nhất và là biểu tượng mới nhất của thành phố mang tên Bác? Bạn có biết bên trong tòa nhà đó có chứa rạp chiếu phim BHD Star Cineplex ICON 68 đẹp nhất đất Sài Gòn. Vinh dự là rạp chiếu phim duy nhất đóng đô tại tòa nhà cao nhất thành phố Hồ Chí Minh – trung tâm thương mại ICON 68, số 2 Hải Triều, quận 1, thành phố Hồ Chí Minh. Rạp BHD Star Cineplex ICON 68 chiếm trọn tầng 3 và tầng 4 của tòa nhà với tổng cộng 7 phòng chiếu phim và hơn 800 ghế ngồi. Trong đó có 4 phòng chiếu phim 3D và 3 phòng chiếu phim 2D. BHD Star Cineplex ICON 68 là rạp chiếu phim có số phòng chiếu phim 3D cao nhất tại thành phố Hồ Chí Minh tính đến thời điểm hiện tại. Rạp chiếu phim được thiết kế bởi những kiến trức sư tài giỏi đến từ nước ngoài. Do vậy rạp mang đạm hơi thở của người dân phương Tây, hiện đại, phóng khoáng và vô cùng quyến rũ. Nhờ vậy khán giả đến với rạp không chỉ để theo dõi những bộ phim điện ảnh hấp dẫn, mà còn đến với rạp để có những bức hình selfie đẹp lung linh trên mạng xã hội.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Vincom Phạm Ngọc Thạch",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "BHD Star Vincom Phạm Ngọc Thạch là cụm rạp chiếu phim đầu tiên của BHD Star Cinema tại Hà Nội. Rạp tọa lạc tại tầng 8 của trung tâm thương mại Vincom, số 2 Phạm Ngọc Thạch, Đống Đa, Hà Nội. Rạp BHD Star Vincom Phạm Ngọc Thạch được xây dựng nhân dịp kỷ niệm công ty BHD tròn 20 năm tuổi. Chính vì vậy, đây không đơn giản là rạp chiếu phim như các cụm rạp khác của BHD Star Cinema, đây còn là công trình đánh dấu chặng đường phát triển của BHD. Do vậy, hệ thống trang thiết bị tại rạp đều là thiết bị hiện đại nhất thế giới hiện nay; nhằm mang lại cho khán giả những giây phút giải trí tuyệt vời sau những giờ làm việc mệt mỏi. Rạp hiện có tất cả 7 phòng chiếu phim, hơn 1000 chỗ ngồi giành cho khán giả. Với 1 phòng chiếu phim 3D và 6 phòng chiếu phim 2D, BHD Star Vincom Phạm Ngọc Thạch luôn đáp ứng được nhu cầu xem phim của giới trẻ Hà Nội. Đến với rạp chiếu phim BHD Star Vincom Phạm Ngọc Thạch, khán giả sẽ được thưởng thức những bộ phim mới hấp dẫn nhất và tận hưởng dịch vụ chuyên nghiệp, đẳng cấp nhất.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Discovery Cầu Giấy",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "BHD Star Cineplex là một trong những hệ thống rạp chiếu phim đẳng cấp nhất tại Việt Nam, song BHD chỉ tập trung phát triển tại Hồ Chí Minh và khá “bỏ bê” Hà Nội. Tuy nhiên tháng 10 tới sẽ có 1 tin vui cho các tín đồ yêu điện ảnh, đó là BHD Star Cineplex sẽ khai trương cụm rạp thứ 2 tại thủ đô - BHD Discovery Cầu Giấy. Rạp chiếu phim BHD Discovery Cầu Giấy tọa lạc tại tầng 8, tầng 9 trung tâm thương mại Discovery Complex, số 302 Cầu Giấy, phường Dịch Vọng, quận Cầu Giấy. Nằm ngay tại cửa ngõ thủ đô, BHD Discovery Cầu Giấy được chính thức khai trương vào tháng 10 này hứa hẹn sẽ là địa chỉ được nhiều tín đồ điện ảnh lựa chọn vào dịp cuối tuần, nghỉ lễ hay những ngày trong tuần có thời gian rảnh rỗi. BHD Discovery Cầu Giấy được trang bị hệ thống thiết bị hiện đại hàng đầu thế giới hiện nay. Mỗi phòng chiếu phim đều sở hữu màn hình lớn có độ phân giải cao, dàn âm thanh được thiết kế đặc biệt nhằm mang lại cảm giác chân thực nhất cho khán giả khi theo dõi phim. Rạp nằm trong hệ thống BHD Star Cineplex, nên mức giá vé được niêm yết trong cùng hệ thống. Các phim được công chiếu đều là những bom tấn điện ảnh mới nhất của Hollywood, Việt Nam và nhiều quốc gia khác trên toàn thế giới. Bên cạnh đó rạp còn có đội ngũ nhân viên chuyên nghiệp được đào tạo bài bản, sẽ mang đến cho khán giả chất lượng phục vụ tốt nhất mỗi khi tới rạp. Sở hữu tất cả những ưu điểm mà mọi rạp chiếu phim khác trên cả nước ao ước, BHD Discovery Cầu Giấy xứng đáng là lựa chọn tin cậy của những tín đồ yêu bộ môn nghệ thuật thứ 7.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BHD Vincom Huế",
          address: "",
          phoneNumber: "",
          rating: 5,
          description:
            "Dự kiến được khai trương vào đúng ngày sinh nhật Bác Hồ 19/5/2018, cụm rạp chiếu phim BHD Star Huế hứa hẹn sẽ trở thành địa điểm vui chơi giải trí hàng đầu của người dân thành phố Huế xinh đẹp. Rạp chiếu phim BHD Star Huế tọa lạc tại trung tâm thương mại Vincom Huế, số 50A đường Hùng Vương, tổ 10, Phú Nhuận, Thành phố Huế. Rạp được xây dựng theo tiêu chuẩn chất lượng quốc tế với mong muốn mang đến cho những tín đồ điện ảnh địa điểm thức thưởng điện ảnh hấp dẫn, chất lượng quốc tế. Hiện tại rạp được trang bị 4 phòng chiếu phim 2D hiện đại với hơn 400 ghế ngồi đặc trưng cho từng tầm nhìn. Màn hình có độ phân giải cực cao, mang lại chất lượng hình ảnh sắc nét. Hệ thống âm thanh tiêu chuẩn Dolby 7.1 góp phần mang đến cho khán giả những âm thanh chân thực nhất của các siêu phẩm điện ảnh. Nằm trong hệ thống cụm rạp BHD Star Cineplex có quy mô phủ sóng khắp toàn quốc, rạp chiếu phim BHD Star Huế luôn cập nhật nhanh chóng và đầy đủ những bom tấn điện ảnh mới nhất, hấp dẫn nhất của Hollywood, Việt Nam và nhiều tác phẩm đến từ các nước trên thế giới. Khi đến với rạp, khán giả sẽ được hưởng chất lượng dịch vụ tốt nhất đến từ đội ngũ nhân viên chuyên nghiệp của BHD Star Huế. Mọi vấn đề bạn gặp phải khi mua vé, mua bỏng ngô, mở thẻ thành viên… tất cả đều được đội ngũ nhân viên hỗ trợ giải quyết nhanh chóng và hiệu quả. Không chỉ vậy, không gian rạp chiếu phim được thiết kế ấn tượng mang đến sự thoải mái cho khán giả trong khoảng thời gian chờ đợi phim chiếu.",
          cinemaComplexId: bhdCinemaComplex.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    await queryInterface.bulkInsert("Cinemas", [...cgvCinemas, ...bhdCinemas]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cinemas", null, {});
  },
};
