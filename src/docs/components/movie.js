module.exports = {
  Movie: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "DOCTOR STRANGE IN THE MULTIVERSE OF MADNESS",
      },
      description: {
        type: "string",
        example:
          "Stephen Strange sử dụng một phép thuật bị cấm mở ra cánh cửa đến đa vũ trụ, với sự giúp đỡ của các đồng minh thần bí cả cũ và mới, vượt qua thực tại để đối đầu với 1 kẻ thù mới, bí ẩn ,nguy hiểm và đáng sợ hơn",
      },
      poster: {
        type: "string",
        example:
          "http://localhost:8080/public/default/images/movies/doctor-strange.jpeg",
      },
      trailer: {
        type: "string",
        example: "https://www.youtube.com/watch?v=aWzlQ2N6qqg",
      },
      rating: {
        type: "float",
        example: 4.9,
      },
      duration: {
        type: "integer",
        example: 128,
      },
      status: {
        type: "string",
        example: "now-showing",
      },
      releaseDate: {
        type: "string",
        format: "date",
        example: "2022-05-04",
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
