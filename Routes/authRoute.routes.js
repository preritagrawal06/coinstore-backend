const router = require('express').Router()
const {loginController, signupController} = require("../Controllers/Common")

router.post('/signup', signupController)
router.post('/login', loginController)

module.exports = router