const express = require('express')
const router = express.Router()
const loginuser = require('../controllers/authController')

router.post('/', loginuser.handlelogin)

module.exports = router