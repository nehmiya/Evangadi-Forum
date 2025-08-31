const mysql = require("mysql2");
const dotenv = require('dotenv')

dotenv.config();


const db = mysql.createPool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
  connectionLimit: 10,
});

db.getConnection((err) => {
  if (err) {
    console.log("Err:", err.message);
  } else {
    console.log("The DB have been Connected!!!");
  }
});
