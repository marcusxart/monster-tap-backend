const socketIo = require("socket.io");

let io;

const initSocket = (server) => {
  if (!io) {
    io = socketIo(server, {
      cors: {
        origin: "http://localhost:5173", // Frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
      },
      transports: ["websocket"],
    });

    // io.on("connection", (socket) => {
    //   console.log("User connected", socket.id);

    //   socket.on("disconnect", () => {
    //     console.log("User disconnected");
    //   });
    // });
  }
  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIo,
};
