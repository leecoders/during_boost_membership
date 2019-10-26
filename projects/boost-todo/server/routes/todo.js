const express = require("express");
const router = express.Router();
const User = new (require("../model/User.js"))();
const Todo = new (require("../model/Todo.js"))();
const { checkTodo } = require("../middlewares/middlewares.js");

router.use("/add-todo", async (req, res) => {
  const { order, content, addedBy, todoBelongList } = req.body;
  Todo.addTodo(order, content, addedBy, todoBelongList, res);
});

router.use("/delete-todo", async (req, res) => {
  const { todoId } = req.body;
  Todo.deleteTodo(todoId, res);
});

router.use("/sort-list-order", async (req, res) => {
  const { listStartTodoIdArray, listEndTodoIdArray } = req.body;
  Todo.sortListOrder(listStartTodoIdArray, listEndTodoIdArray, res);
});

router.use("/update-todo-belong-list", async (req, res) => {
  const { todoId, listEndId } = req.body;
  Todo.updateTodoBelongList(todoId, listEndId, res);
});

router.use("/update-list-name", async (req, res) => {
  const { listId, title } = req.body;
  Todo.updateListName(listId, title, res);
});

router.use("/update-board-name", async (req, res) => {
  const { boardId, title } = req.body;
  Todo.updateBoardName(boardId, title, res);
});

router.use("/add-column", async (req, res) => {
  const { boardId } = req.body;
  Todo.addcolumn(boardId, res);
});

router.use("/get-boards", async (req, res) => {
  const { userId } = req.body;
  Todo.getBoardsByUserId(userId, res);
});

router.use("/get-lists", async (req, res) => {
  const { boardId } = req.body;
  Todo.getListsByBoardId(boardId, res);
});

router.use("/get-todos", async (req, res) => {
  const { listId } = req.body;
  Todo.getTodosByListId(listId, res);
});

router.use("/user-info", async (req, res) => {
  const userInfo = req.user; // 세션에 저장된 user 정보 제공
  res.send(userInfo);
});

router.use("/:id", (req, res, next) => {
  const ownerId = req.params.id; // URL로 입력 받은 유저 아이디가 존재하지 않는지 체크해야 함
  const visiterId = req.user.USER_ID;
  const visiterGrade = req.user.USER_GRADE;
  // 아이디는 다르지만 읽기 권한이 있는지 체크해야 함
  if (visiterGrade === "admin" || ownerId === visiterId) {
    // 관리자 권한이거나 로그인한 유저 본인이면 todo 연결
    res.render("todo", { id: ownerId });
    return;
  }
  next();
});

module.exports = router;
