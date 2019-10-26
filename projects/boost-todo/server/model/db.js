const mysql = require("mysql2/promise");

require("dotenv").config();
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
