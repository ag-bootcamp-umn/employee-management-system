const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = db;