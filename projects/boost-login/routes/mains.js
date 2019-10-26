const express = require("express");
const router = express.Router();
const mainsRouter = router;

let model;
/**
 * 서버의 라이프사이클 중간에 라우터에서 모델 객체를 받기 위해 만들어진 함수
 *
 * @param {Model} appsModel
 */
const initModelFromAppToMainsRouter = appsModel => {
  model = appsModel;
};

router.use("/check-cookie", (req, res) => {
  model.checkCookie(req, res);
});

router.use("/user-info", (req, res) => {
  model.getUserInfo(req, res);
});

router.use("/user-name", (req, res) => {
  model.getUserName(req, res);
});

router.use("/logout", (req, res) => {
  model.userLogout(req, res);
});

module.exports = { mainsRouter, initModelFromAppToMainsRouter };
