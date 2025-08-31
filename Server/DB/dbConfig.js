const mysql = require("mysql2");

const db = mysql.createPool({
  user: "evangadiAdmin",
  password: "123456",
  host: "localhost",
  database: "evangadi-db",
  connectionLimit: 10,
});

db.getConnection((err) => {
  if (err) {
    console.log("Err:", err.message);
  } else {
    console.log("The DB have been Connected!!!");
  }
});
