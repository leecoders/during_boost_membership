const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = new (require("../model/User.js"))();
// const { isLoggedIn, isNotLoggedIn } = require("../middlewares/middlewares.js");

router.use(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/signin/success",
    failureRedirect: "/"
  })
);

router.use("/success", (req, res) => {
  res.redirect("/todo/" + req.user.USER_ID);
});

router.use("/find-user", async (req, res) => {
  const { userId, userPassword } = req.body;
  const result = await User.findUser(userId, userPassword);
  res.json(result);
});

router.use("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.use("/", (req, res) => {
  res.render("signin");
});

module.exports = router;
