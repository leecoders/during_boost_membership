const betterSqlite3 = require("better-sqlite3");

/**
 * 데이터베이스(SQLite)에 쉽게 접근하도록 API 정의한 DB객체
 */
class DB {
  /**
   * @param {DB} db app.js에서 SQLite 객체(데이터베이스)를 생성하여 정의된 DB객체에 생성자로 받음
   */
  constructor(db) {
    this.db = betterSqlite3("./model/ss62.db");
    // this.db = betterSqlite3("ss62.db");
  }
  /**
   * @param {string} table 생성할 테이블 이름
   * @param {string} columns 생성할 컬럼들의 이름과 타입 쌍
   */
  create(table, columns) {
    const query = `CREATE TABLE IF NOT EXISTS ${table} ${columns}`;
    this.db.prepare(query).run();
  }
  /**
   * @param {string} table 삭제할 테이블 이름
   */
  drop(table) {
    const query = `DROP TABLE IF EXISTS ${table}`;
    this.db.prepare(query).run();
  }
  /**
   *
   * @param {string} table 삽입할 테이블 이름
   * @param {string} columns 삽입할 컬럼들의 이름
   */
  insert(table, columns) {
    const query = `INSERT into ${table} VALUES ${columns}`;
    this.db.prepare(query).run();
  }
  /**
   *
   * @param {string} table 삭제할 컬럼이 있는 테이블 이름
   * @param {string} condition 삭제 조건
   */
  delete(table, condition) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;
    this.db.prepare(query).run();
  }
  /**
   * 
   * @param {string} table 탐색할 테이블 이름
   * @param {string} column 탐색할 컬럼 이름
   * @param {string} condition 탐색 조건
   */
  select(table, column, condition) {
    let query = `SELECT ${column} from ${table}`;
    if (condition) query += " WHERE " + condition;
    let ret = this.db.prepare(query).all();
    return ret;
  }
}
module.exports = DB;
