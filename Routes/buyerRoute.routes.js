const { getAnnouncements } = require('../Controllers/AnnouncementController')
const { getTransactions, addMoneyToWallet, topupThroughWallet } = require('../Controllers/BuyerControllers')
const { buyerAccessMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.get('/transactions/all', authMiddleWare, buyerAccessMiddleware, getTransactions)
router.post('/wallet/add', authMiddleWare, buyerAccessMiddleware, addMoneyToWallet)
router.post('/wallet/topup', authMiddleWare, buyerAccessMiddleware, topupThroughWallet)
router.get('/get-announcement', getAnnouncements)

module.exports = router