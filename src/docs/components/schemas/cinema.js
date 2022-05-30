module.exports = {
  Cinema: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "CGV Aeon Bình Tân",
      },
      address: {
        type: "string",
        example:
          "Tầng 3, Trung tâm thương mại Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, phường Bình Trị Đông B, quận Bình Tân, TPHCM",
      },
      phoneNumber: {
        type: "string",
        example: "1900 6017",
      },
      rating: {
        type: "float",
        example: 5,
      },
      description: {
        type: "string",
        example:
          "CGV Aeon Mall Bình Tân chính thức khai trương và đi vào hoạt động từ ngày 1/7/2016 tại tầng 3, nằm trong khu vực TTTM Aeon Mall Bình Tân, Quận Bình Tân, TP.Hồ Chí Minh với tổng diện tích sàn lên đến 114.000m2. Được trang bị 7 phòng chiếu hiện đại, đặc biệt là phòng chiếu starium laser, CGV Aeon Mall Bình Tân là một trong những cụm rạp lớn nhất của CJ CGV tại Việt Nam với hơn 1.200 ghế ngồ, hứa hẹn sẽ là một điểm sáng giải trí của người dân khu vực Bình Tân và khu vực lân cận. Với phòng chiếu Starium Laser, khán giả sẽ được thưởng thức các bộ phim tmột cách vô cùng sống động bởi sự kết hợp của công nghệ và các thiết bị chiếu phim tối tân nhất. Có Màn hình cong cao cấp với kích thước khổng lồ, bao phủ toàn bộ khu vực tiếp nhận hình ảnh từ máy chiếu, phối hợp nhịp nhàng cùng sơ đồ ghế ngồi, từ đó đem đến góc nhìn tốt nhất cho mọi vị trí trong phòng chiếu. Khi đến với CGV Aeon Mall Bình Tân, khán giả không chỉ được thưởng thức công nghệ chiếu phim hiện đại tại CGV, mà còn có cơ hội tận hưởng những dịch vụ đa dạng trong khu phức hợp TTTM Aeon Mall Bình Tân như siêu thị Aeon, các gian hàng mỹ phẩm, thời trang, nội thất, cùng các khu vực giải trí cực chất như: Vuvuzela Beer Club, Phòng Karaoke gia đình, khu vực vui chơi miễn phí cho trẻ em và khu ẩm thực với hơn 30 nhà hàng, quán ăn.",
      },
      cinemaComplexId: {
        type: "integer",
        example: 1,
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};
