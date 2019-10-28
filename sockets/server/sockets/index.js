module.exports = io => {
  let messages = [];
  io.on("connection", socket => {
    socket.on("new message", msg => {
      messages.push(msg);
      io.emit("add message", { messages: messages });
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
