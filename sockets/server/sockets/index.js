module.exports = io => {
  io.on("connection", socket => {
    console.log("a user connected");
    socket.on("new message", msg => {
      io.emit("chat message", { message: msg });
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
