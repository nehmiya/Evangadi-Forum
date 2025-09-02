const db = require("../DB/dbConfig");
const bcrypt = require("bcrypt");


const landing = async (req, res) => {
  res.send("<h1>The server is up and running...</h1>");
};

const register = async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !firstname || !username || !lastname || !password) {
    return res.status(401).json({ msg: "Please Provide correct credentials!" });
  } else {
    try {
      const checkUser = `SELECT username,userID FROM users WHERE username = ? OR email = ?`;

      const [user] = await db.query(checkUser, [username, email]);

      if (user.length > 0) {
        return res.status(400).json({
          msg: "The user already Exist!",
        });
      }
      if (password.length < 8) {
        return res.status(400).json({
          msg: "The password needs to be atleast 8 characters!",
        });
      }

      const salt = await bcrypt.genSalt(10)

      const hashedPass = await bcrypt.hash(password,salt)

      const register = `INSERT INTO users (
    username, firstname, lastname, email, password
) VALUES (?, ?, ?, ?, ?)`;
      await db.query(register, [
        username,
        firstname,
        lastname,
        email,
        hashedPass,
      ]);
      return res.status(201).json({ msg: "User Registered Successfully!!!" });
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ msg: "Something went wrong, Please Try Again Later!" });
    }
  }
};

const login = async (req, res) => {
  res.send("Login User");
};

const check = async (req, res) => {
  res.send("Check User");
};

module.exports = { landing, register, login, check };
