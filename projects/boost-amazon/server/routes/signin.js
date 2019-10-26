const express = require("express");
const router = express.Router();
const signinRouter = router;

let model;

const passModelToSignin = modelFromApp => {
  model = modelFromApp;
};

router.use("/submit", async (req, res) => {
  await model.checkLogin(req, res);
});

module.exports = { signinRouter, passModelToSignin };
