const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const dotenv = require('dotenv');
dotenv.config()

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      err: "Authentication Invalid!!!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { username, userID } = jwt.verify(token, process.env.JWT_SECRET);
    req.user={username,userID}
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Authentication Invalid!!!",
    });
  }
};


module.exports = authMiddleware
