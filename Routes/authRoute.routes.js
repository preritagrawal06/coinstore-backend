const router = require('express').Router()
const {loginController, signupController, sendOTP, verifyOTP, resendOTP} = require("../Controllers/Common")

router.post('/signup', signupController)
router.post('/login', loginController)
router.post('/sendOtp', sendOTP)
router.post('/verifyOtp', verifyOTP)
router.post('/resendOtp', resendOTP)

module.exports = router