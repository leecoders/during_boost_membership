const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = new (require("../model/User.js"))();

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serializeUser!!");
    done(null, user.id);
  });
  passport.deserializeUser(async (userId, done) => {
    console.log("deserializeUser!!");
    const result = await User.findUserById(userId);
    if (!!result.USER_ID) {
      done(null, result); // 여기의 두 번째 인자가 req.user가 됨
    } else {
      console.log(result);
    }
  });
  passport.use(
    new LocalStrategy(
      { usernameField: "id", passwordField: "password" },
      async (id, password, done) => {
        const result = await User.findUser(id, password);
        if (result === "success") {
          return done(null, { id, password });
        }
        if (result === "failure") {
          return done(null, false, {
            message: "Incorrect info."
          });
        }
        if (result === "db not connected") {
          return done(null, false, {
            message: "db not connected"
          });
        }
      }
    )
  );
};
