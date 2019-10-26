const express = require("express");
const router = express.Router();
const usersRouter = router;

let model;

const passModelToUsers = modelFromApp => {
  model = modelFromApp;
};

router.use("/all", function(req, res, next) {
  model.getAllUsers(req, res);
});

router.use("/change-grade", function(req, res, next) {
  model.changeUserGrade(req, res);
});

module.exports = { usersRouter, passModelToUsers };
