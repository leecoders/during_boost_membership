const util = require("../utils");
let messages = require("../model/data.js");

let rooms = [];

module.exports = io => {
  io.on("connection", socket => {
    // const roomNumber = socket.request.headers.referer.split("room/")[1];
    // socket.join(roomNumber);
    // socket.on("new message", msg => {
    //   messages.push({ message: msg, date: util.getDateFormat(new Date()) });
    //   io.emit("add message", { data: messages });
    // });
    // socket.on("disconnect", () => {
    //   console.log("user disconnected");
    // });

    // const roomNumber = socket.request.headers.cookie
    //   .split("roomNumber=")[1]
    //   .split(";")[0];

    socket.on("joinroom", data => {
      socket.join(data.roomNumber);
    });
    socket.on("new message", data => {
      messages.push({
        message: data.message,
        date: util.getDateFormat(new Date())
      });
      io.to(data.roomNumber).emit("add message", { data: messages });
    });
  });
};
