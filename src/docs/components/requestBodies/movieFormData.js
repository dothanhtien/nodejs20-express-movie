module.exports = {
  MovieFormData: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "DORAEMON: NOBITA VÀ CUỘC CHIẾN VŨ TRỤ TÍ HON 2021",
      },
      description: {
        type: "string",
        example:
          "Doraemon: Nobita và Cuộc Chiến Vũ Trụ Tí Hon 2021 là một lựa chọn cực kỳ sáng suốt trong dịp Tết Thiếu Nhi 2022 sắp đến. Một bom tấn đúng nghĩa dành cho tất cả mọi người, từ già trẻ lớn bé...",
      },
      poster: {
        type: "string",
        format: "binary",
      },
      trailer: {
        type: "string",
        example: "https://www.youtube.com/embed/Z1sxl9wKVUA",
      },
      rating: {
        type: "number",
        format: "float",
        example: "4.9",
      },
      duration: {
        type: "integer",
        example: 109,
      },
      status: {
        type: "string",
        example: "now-showing",
      },
      releaseDate: {
        type: "string",
        format: "date",
        example: "2022-05-27",
      },
    },
  },
};
