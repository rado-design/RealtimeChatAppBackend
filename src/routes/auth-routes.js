const express = require('express')
const router  = express.Router()
const AuthentificationController = require('../controller/authentificatino-controller')


router.post('/register', AuthentificationController.register)
router.post('/login', AuthentificationController.login)
router.get('/refresh-token', AuthentificationController.generateNewPairToken)

module.exports = router
