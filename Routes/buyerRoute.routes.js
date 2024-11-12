const { getTransactions, addMoneyToWallet, topupThroughWallet } = require('../Controllers/BuyerControllers')
const { buyerAccessMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.post('/transactions/all', authMiddleWare, buyerAccessMiddleware, getTransactions)
router.post('/wallet/add', authMiddleWare, buyerAccessMiddleware, addMoneyToWallet)
router.post('/wallet/topup', authMiddleWare, buyerAccessMiddleware, topupThroughWallet)

module.exports = router