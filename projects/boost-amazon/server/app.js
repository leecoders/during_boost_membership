const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const mysql = require("mysql2/promise");
const ejs = require("ejs");

require("dotenv").config();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/item_images");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const Model = require("./model/model.js");
const pool = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10
});

const indexRouter = require("./routes/index");
const { signinRouter, passModelToSignin } = require("./routes/signin");
const { usersRouter, passModelToUsers } = require("./routes/users");
const { itemsRouter, passModelToItems } = require("./routes/items");

const app = express();
const model = new Model(pool);

passModelToSignin(model);
passModelToUsers(model);
passModelToItems(model);

app.set("web", path.join(__dirname, "web"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/public", express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/signin", signinRouter);
app.use("/users", usersRouter);
app.use("/items", upload.single("item"), itemsRouter);

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
