module.exports = {
  CinemaForm: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "CGV Giga Mall Thủ Đức",
      },
      address: {
        type: "string",
        example:
          "Tầng 6 TTTM GIGAMALL, 240-242 Phạm Văn Đồng, P. Hiệp Bình Chánh, Q. Thủ Đức, TPHCM",
      },
      phoneNumber: {
        type: "string",
        example: "1900 6017",
      },
      rating: {
        type: "number",
        format: "float",
        example: 5,
      },
      description: {
        type: "string",
        example:
          "Rạp chiếu phim CGV Giga Mall Thủ Đức mở cửa phục vụ khán giả từ tháng 2/2019, là cụm rạp thứ 2 tại khu vực Thủ Đức và thứ 22 của CJ CGV tại khu vực thành phố Hồ Chí Minh. Kể từ thời điểm đi vào hoạt động, CGV Giga Mall Thủ Đức đã trở thành cụm rạp chiếu phim có diện tích lớn top đầu tại thành phố mang tên Bác với tổng diện tích lên tới hơn 3.200m². Rạp CGV Giga Mall Thủ Đức được thiết kế theo phong cách retro đặc trưng của hệ thống CGV, gồm 8 phòng chiếu phim với hơn 1.100 ghế ngồi cao cấp. Rạp có đầy đủ phòng chiếu phim định dạng 2D và 3D, đáp ứng nhu cầu theo dõi phim đa dạng của khán giả, đặc biệt trong những dịp đông khách như cuối tuần, lễ tết hay có bom tấn điện ảnh mới được trình chiếu. Hệ thống trang thiết bị của rạp chiếu phim CGV Giga Mall Thủ Đức được đầu tư hiện đại với màn hình kích thước lớn có độ phân giải cao, âm thanh vòm chuẩn Dolby 7.1, ánh sáng chuẩn quốc tế. Đội ngũ kỹ thuật giàu kinh nghiệm thường xuyên kiểm tra, bảo dưỡng các trang thiết bị nhằm đảm bảo mang đến cho khách hàng những trải nghiệm điện ảnh hoàn hảo nhất. CGV Giga Mall Thủ Đức có không gian sảnh chờ lớn, được trang trí sáng tạo và bắt mắt, mang đến cho khán giả những góc chụp hình tuyệt đẹp khi chờ đợi phim được công chiếu. Rạp chiếu phim CGV Giga Mall Thủ Đức hiện đang dẫn đầu các rạp chiếu phim trong khu vực về mức độ yêu thích của khán giả.",
      },
      cinemaComplexId: {
        type: "integer",
        example: 1,
      },
    },
  },
};
