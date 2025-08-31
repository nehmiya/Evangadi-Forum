const express = require('express')
const router = express.Router();
const app = express()


app.get("/", (req, res) => {
  res.send("<h1>The server is up and running...</h1>");
});

router.post("/register", (req, res) => {
  res.send("Register User");
});

router.post("/login", (req, res) => {
  res.send("Login User");
});

router.get("/check", (req, res) => {
  res.send("Check User");
});

module.exports = router