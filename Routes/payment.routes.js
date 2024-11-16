const {initiatePayment, paymentStatus, addToWallet} = require('../Controllers/PaymentControllers')
const { buyerAccessMiddleware, authMiddleware } = require('../Middlewares')

const router = require('express').Router()

router.post('/initiate-payment', initiatePayment)
router.post('/add-wallet', authMiddleware, buyerAccessMiddleware, addToWallet)
router.get('/payment-status', paymentStatus)

module.exports = router