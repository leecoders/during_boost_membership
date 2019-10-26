class Model {
  constructor(pool) {
    this.pool = pool;
  }

  async checkLogin(req, res) {
    const { id, password } = req.body;
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select * from USER where USER_ID=? and USER_PASSWORD=?`,
        [id, password]
      );
      connection.release();
      if (rows.length) res.send({ message: "success" });
      else res.send({ message: "failure" });
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }

  async getAllUsers(req, res) {
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(`select * from USER`);
      res.send({ message: "success", data: rows });
      connection.release();
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }

  async changeUserGrade(req, res) {
    const { id, destGrade } = req.body;
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `update USER set USER_GRADE=? where USER_ID=?`,
        [destGrade, id]
      );
      res.send({ message: "success" });
      connection.release();
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }

  async checkItemNameDuplicate(req, res) {
    const { name } = req.body;
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select * from ITEM where ITEM_NAME=?`,
        [name]
      );
      res.send({ message: "success", data: rows.length });
      connection.release();
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }

  async addItem(req, res) {
    const itemImage = req.file;
    const { name, category, summary } = req.body;
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `insert into ITEM values (?, ?, ?, ?)`,
        [itemImage.originalname, name, category, summary]
      );
      res.send({ message: "success" });
      connection.release();
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }

  async getItemInfoList(req, res) {
    const { categoryName } = req.body;
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `select * from ITEM where ITEM_CATEGORY=?`,
        [categoryName]
      );
      res.send({ message: "success", data: rows });
      connection.release();
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }

  async deleteItem(req, res) {
    const { categoryName, itemName } = req.body;
    try {
      const connection = await this.pool.getConnection(async conn => conn);
      const [rows] = await connection.query(
        `delete from ITEM where ITEM_CATEGORY=? and ITEM_NAME=?`,
        [categoryName, itemName]
      );
      res.send({ message: "success" });
      connection.release();
    } catch (err) {
      res.send({ message: "db not connected" });
      throw err;
    }
  }
}

module.exports = Model;
