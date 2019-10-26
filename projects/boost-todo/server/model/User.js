const pool = require("./db.js");

class User {
  constructor() {}

  async allUsers(res) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select USER_ID, USER_NAME, USER_GRADE from USER`
      );
      connection.release();
      if (rows.length) return res.json(rows);
      else return "failure";
    } catch (err) {
      return "db not connected";
    }
  }

  async findUser(id, password) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select USER_ID from USER where USER_ID=? and USER_PASSWORD=?`,
        [id, password]
      );
      connection.release();
      if (rows.length) return "success";
      else return "failure";
    } catch (err) {
      return "db not connected";
    }
  }

  async findUserById(id) {
    try {
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select USER_ID, USER_NAME, USER_GRADE from USER where USER_ID=?`,
        [id]
      );
      connection.release();
      if (rows.length) return rows[0];
      else return "failure";
    } catch (err) {
      return "db not connected";
    }
  }

  async changeGrade(userId, targetGrade, res) {
    try {
      console.log(userId + "'s grade is changing to " + targetGrade);
      const connection = await pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `update USER set USER_GRADE=? where USER_ID=?`,
        [targetGrade, userId]
      );
      connection.release();
      if (rows.length) res.json("success");
      else return res.json("failure");
    } catch (err) {
      return res.json("db not connected");
    }
  }
}

module.exports = User;
