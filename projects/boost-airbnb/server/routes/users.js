const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.js");

router.use("/check-cookie", function(req, res, next) {
  controller.checkCookie(req, res);
});

router.use("/create-user", function(req, res, next) {
  const { id, password, name } = req.body;
  controller.createUser(id, password, name, res);
});

router.use("/signin", function(req, res, next) {
  const { id, password } = req.body;
  controller.signin(id, password, res);
});

module.exports = router;
