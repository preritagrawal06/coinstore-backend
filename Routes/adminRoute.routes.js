const { approveSellerController } = require('../Controllers/AdminControllers')
const { adminAccessMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.post('/verify', authMiddleWare, adminAccessMiddleware, approveSellerController)

module.exports = router