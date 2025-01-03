const loginController = require('./LoginController')
const signupController = require('./SignupController')
const getAccountController = require('./getAccountController')
const getAccountsController = require('./getAccountsController')
const sendOTP = require('./sendOTP')
const verifyOTP = require('./verifyOTP')
const resendOTP = require('./resendOTP')

module.exports = {loginController, signupController, getAccountController, getAccountsController, sendOTP, verifyOTP, resendOTP}