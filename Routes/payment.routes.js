const {initiatePayment, paymentStatus} = require('../Controllers/PaymentControllers')
const router = require('express').Router()

router.post('/initiate-payment', initiatePayment)
router.get('/payment-status', paymentStatus)

module.exports = router