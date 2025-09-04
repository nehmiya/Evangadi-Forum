const mysql = require("mysql2");
const dotenv = require('dotenv')

dotenv.config();


const db = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  connectionLimit: 10,
});

module.exports = db.promise()