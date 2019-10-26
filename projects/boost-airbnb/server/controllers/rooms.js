const models = require("../models");

const getRooms = res => {
  models.Room.findAll()
    .then(result => {
      res.json({ message: "success", data: { rooms: result } });
    })
    .catch(err => {
      res.json({ message: "failure" });
    });
};

module.exports = {
  getRooms
};
