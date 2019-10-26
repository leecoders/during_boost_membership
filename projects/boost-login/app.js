const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const DB = require("./server_util/database.js");
const HashMap = require("./server_util/HashMap.js");
const { Model } = require("./model/Model.js");

const indexRouter = require("./routes/index");
const {
  mainsRouter,
  initModelFromAppToMainsRouter
} = require("./routes/mains.js");
const {
  signInsRouter,
  initModelFromAppToSignInsRouter
} = require("./routes/signIns.js");
const {
  signUpsRouter,
  initModelFromAppToSignUpsRouter
} = require("./routes/signUps.js");

/**
 * main 페이지에서 발생하는 라우팅 처리하기 전 세션을 체크하여
 * 유효하지 않으면 로그인 페이지로 이동하도록 false를 send
 *
 * @param {request} req
 * @param {response} res
 * @param {middleware} next
 */
const checkSession = (req, res, next) => {
  const ssid = req.cookies.ssid;
  const sessionsExpires =
    hashMapForSsid.get(ssid) !== undefined && hashMapForSsid.get(ssid).expires;
  if (
    sessionsExpires === undefined ||
    hashMapForSsid.get(ssid).expires < new Date(Date.now())
  ) {
    res.send(false);
    return;
  }
  next();
};

const app = express();
const db = new DB();
const hashMapForSsid = new HashMap();
db.create(
  "USERS",
  `(USER_ID TEXT,
      USER_PASSWORD TEXT,
      USER_NAME TEXT, 
      USER_YEAR TEXT, 
      USER_MONTH TEXT, 
      USER_DAY TEXT, 
      USER_GENDER TEXT, 
      USER_EMAIL TEXT, 
      USER_PHONE TEXT, 
      USER_INTERESTS TEXT)`
);
const model = new Model(db, hashMapForSsid);
initModelFromAppToMainsRouter(model);
initModelFromAppToSignInsRouter(model);
initModelFromAppToSignUpsRouter(model);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public/img", "favicon.ico")));

app.use("/", indexRouter);
app.use("/sign-ups", signUpsRouter);
app.use("/sign-ins", signInsRouter);
app.use(checkSession);
app.use("/mains", mainsRouter);

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
  res.render("error");
});

module.exports = app;
