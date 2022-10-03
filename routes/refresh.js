const express = require('express')
const router = express.Router()
const refreshcontroller = require('../controllers/refreshTokenController')

router.get('/', refreshcontroller.handlerefreshToken)

module.exports = router