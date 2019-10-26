const express = require("express");
const router = express.Router();
const itemsRouter = router;

let model;

const passModelToItems = modelFromApp => {
  model = modelFromApp;
};

router.use("/check-item-name", function(req, res) {
  model.checkItemNameDuplicate(req, res);
});

router.use("/add", function(req, res) {
  model.addItem(req, res);
});

router.use("/item-info-list", function(req, res) {
  model.getItemInfoList(req, res);
});

router.use("/delete", function(req, res) {
  model.deleteItem(req, res);
});

module.exports = { itemsRouter, passModelToItems };
