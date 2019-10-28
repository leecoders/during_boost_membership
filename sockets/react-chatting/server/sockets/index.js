const util = require("../utils");
let messages = require("../model/data.js");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("new message", msg => {
      messages.push({ message: msg, date: util.getDateFormat(new Date()) });
      io.emit("add message", { data: messages });
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
