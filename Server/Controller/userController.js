const db = require("../DB/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {StatusCodes}  = require('http-status-codes')
const dotenv = require('dotenv')

dotenv.config()



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
  const {email,password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      err: "Please provide all the required Credentials!!"
    })
  }

  try {
    const checkUser = `SELECT username,userID,password FROM users WHERE email=?`
    const [user] = await db.query(checkUser, [email])

    if (user.length == 0) {
      return res.status(400).json({
        msg: "Invalid Credentials!"
      })
    }

    
      const checkPass = await bcrypt.compare(password,user[0].password)
      
      if(!checkPass) {
        res.status(400).json({
          mdg: "Invaild Credentials!"
        })
      }

      const username = user[0].username
      const userID = user[0].userID

      const token = jwt.sign({ username, userID }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.json({
        msg: `User auth Token: ${token}`,
        token
      })

      // return res.json({
      //   user:user
      // })
      
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ msg: "Something went wrong, Please Try Again Later!" });
  }

};

const check = async (req, res) => {
  const username = req.user.username
  const userID = req.user.userID
  res.status(StatusCodes.OK).json({
    msg: "Valid User.",
    username,
    userID
  })
};

module.exports = { landing, register, login, check };
