const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("ㅇㅇ");
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

const checkTodo = (req, res, next) => {};

module.exports = { checkTodo };
