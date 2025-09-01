const { register,login,check } = require ('../Controller/userController.js') ;
const express = require('express')
const router = express.Router();
const app = express()




router.post("/register", register);

router.post("/login", login);

router.get("/check", check);

module.exports = router