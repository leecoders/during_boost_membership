const express = require("express");
const router = express.Router();
const controller = require("../controllers/rooms.js");

router.use("/get-rooms", function(req, res, next) {
  controller.getRooms(res);
});

module.exports = router;
