const express = require("express");
const router = express.Router();
const signInsRouter = router;

let model;
/**
 * 서버의 라이프사이클 중간에 라우터에서 모델 객체를 받기 위해 만들어진 함수
 *
 * @param {Model} appsModel
 */
const initModelFromAppToSignInsRouter = appsModel => {
  model = appsModel;
};

router.use("/sign-in", (req, res) => {
  model.isValidUser(req, res);
});

router.use("/check-cookie", (req, res) => {
  model.checkCookie(req, res);
});

module.exports = { signInsRouter, initModelFromAppToSignInsRouter };
