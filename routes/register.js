const express = require('express')
const router = express.Router()
const regController = require('../controllers/registerController')

router.post('/', regController.handleNewUser)

module.exports = router