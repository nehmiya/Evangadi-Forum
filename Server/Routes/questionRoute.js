const express = require('express')
const router = express.Router()
const allQuestions = require('../Controller/questionController')

const authMiddleware = require('../Middleware/authMiddleware')

router.get('/all-questions',allQuestions)

module.exports = router