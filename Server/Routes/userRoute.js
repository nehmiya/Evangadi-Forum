const { register,login,check } = require ('../Controller/userController.js') ;
const authMiddleware = require('../Middleware/authMiddleware.js')
const express = require('express')
const router = express.Router();
const app = express()




router.post("/register", register);

router.post("/login", login);

router.get("/check", authMiddleware, check);

module.exports = router