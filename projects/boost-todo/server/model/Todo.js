const pool = require("./db.js");

class Todo {
  constructor() {}

  async getBoardsByUserId(userId, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select BOARD_ID, BOARD_NAME, BOARD_WRITE_PERMISSION, BOARD_READ_PERMISSION from BOARD where BOARD_OWNER=?`,
        [userId]
      );
      connection.release();
      if (rows.length) return res.json({ message: "success", data: rows });
      else res.json({ message: "failure" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async getListsByBoardId(boardId, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select LIST_ID, LIST_NAME from LIST where LIST_BELONG_BOARD=? order by LIST_ID`,
        [boardId]
      );
      connection.release();
      if (rows.length) return res.json({ message: "success", data: rows });
      else res.json({ message: "failure" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async getTodosByListId(listId, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select TODO_ID, TODO_ORDER, TODO_CONTENT, TODO_ADDED_BY from TODO where TODO_BELONG_LIST=? order by TODO_ORDER`,
        [listId]
      );
      connection.release();
      return res.json({ message: "success", data: rows });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async addTodo(order, content, addedBy, todoBelongList, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `insert into TODO(TODO_ORDER, TODO_BELONG_LIST, TODO_CONTENT, TODO_ADDED_BY) values (?, ?, ?, ?)`,
        [+order, +todoBelongList, content, addedBy]
      );
      const [rows2] = await connection.query(
        `select TODO_ID from TODO order by TODO_ID`
      );
      connection.release();
      if (rows.affectedRows || rows2.length)
        return res.json({
          message: "success",
          data: rows2[rows2.length - 1].TODO_ID
        });
      else res.json({ message: "failure" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async deleteTodo(todoId, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `delete from TODO where TODO_ID=?`,
        [todoId]
      );
      connection.release();
      if (rows.affectedRows) return res.json({ message: "success" });
      else res.json({ message: "failure" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async sortListOrder(listStartTodoIdArray, listEndTodoIdArray, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      for (let i = 0; i < listStartTodoIdArray.length; ++i) {
        const [rows] = await connection.query(
          `update TODO set TODO_ORDER=? where TODO_ID=?`,
          [i, listStartTodoIdArray[i]]
        );
        if (!rows.affectedRows) {
          res.json({ message: "failure" });
          return;
        }
      }
      for (let i = 0; i < listEndTodoIdArray.length; ++i) {
        const [rows] = await connection.query(
          `update TODO set TODO_ORDER=? where TODO_ID=?`,
          [i, listEndTodoIdArray[i]]
        );
        if (!rows.affectedRows) {
          res.json({ message: "failure" });
          return;
        }
      }
      connection.release();
      res.json({ message: "success" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async updateTodoBelongList(todoId, listEndId, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `update TODO set TODO_BELONG_LIST=? where TODO_ID=?`,
        [listEndId, todoId]
      );
      connection.release();
      if (rows.affectedRows) res.json({ message: "success" });
      else res.json({ message: "error" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async addcolumn(boardId, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `insert into LIST(LIST_NAME, LIST_BELONG_BOARD) values("I don't have name", ?)`,
        [boardId]
      );
      const [rows2] = await connection.query(
        `select LIST_ID, LIST_NAME from LIST order by LIST_ID`
      );
      connection.release();
      if (rows.affectedRows || rows2.length)
        res.json({
          message: "success",
          data: {
            id: rows2[rows2.length - 1].LIST_ID,
            name: rows2[rows2.length - 1].LIST_NAME
          }
        });
      else res.json({ message: "error" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async updateListName(listId, title, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `update LIST set LIST_NAME=? where LIST_ID=?`,
        [title, listId]
      );
      connection.release();
      if (rows.affectedRows)
        res.json({
          message: "success"
        });
      else res.json({ message: "error" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }

  async updateBoardName(boardId, title, res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `update BOARD set BOARD_NAME=? where BOARD_ID=?`,
        [title, boardId]
      );
      connection.release();
      if (rows.affectedRows)
        res.json({
          message: "success"
        });
      else res.json({ message: "error" });
    } catch (err) {
      res.json({ message: "db not connected" });
    }
  }
}

module.exports = Todo;
