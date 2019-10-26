const express = require("express");
const router = express.Router();
const signUpsRouter = router;

let model;
/**
 * 서버의 라이프사이클 중간에 라우터에서 모델 객체를 받기 위해 만들어진 함수
 *
 * @param {Model} appsModel
 */
const initModelFromAppToSignUpsRouter = appsModel => {
  model = appsModel;
};

router.use("/sign-up", (req, res) => {
  model.addUser(req, res);
});

router.use("/check-duplicate", (req, res) => {
  model.checkDuplicate(req, res);
});

router.use("/check-cookie", (req, res) => {
  model.checkCookie(req, res);
});

module.exports = { signUpsRouter, initModelFromAppToSignUpsRouter };
