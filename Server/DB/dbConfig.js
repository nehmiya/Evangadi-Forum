const mysql = require("mysql2");
const dotenv = require('dotenv')

dotenv.config();


const db = mysql.createPool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database:"evangadi-db",
  connectionLimit: 10,
});

module.exports = db.promise()