const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const passport = require("passport");
const passportConfig = require("./passport");

const indexRouter = require("./routes/index.js");
const signinRouter = require("./routes/signin.js");
const todoRouter = require("./routes/todo.js");
const adminRouter = require("./routes/admin.js");

const app = express();

require("./model/db.js");
require("./model/User.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/src")));
app.use(
  session({
    secret: "top secret",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(), // sessions 디렉토리 생성
    cookie: {
      maxAge: 1000 * 60 * 30 // 쿠키 유효기간 30분
    }
  })
);

// set passport
app.use(passport.initialize()); // passport를 사용하겠다는 것을 req에 알림
app.use(passport.session()); // passport 내부에서 session을 사용할 것임
passportConfig();

app.use("/signin", signinRouter);
app.use("/todo", todoRouter);
app.use("/admin", adminRouter);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
