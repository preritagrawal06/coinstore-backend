const { approveSellerController, walletAction } = require('../Controllers/AdminControllers')
const { addAnnouncement } = require('../Controllers/AnnouncementController')
const { getAllTransactions, getTransaction } = require('../Controllers/TransactionController')
const { adminAccessMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.post('/verify', authMiddleWare, adminAccessMiddleware, approveSellerController)
router.get('/transaction/getall', authMiddleWare, adminAccessMiddleware, getAllTransactions)
router.post('/transaction/getone', authMiddleWare, adminAccessMiddleware, getTransaction)
router.post('/wallet-action', authMiddleWare, adminAccessMiddleware, walletAction)
router.post('/add-announcement', authMiddleWare, adminAccessMiddleware, addAnnouncement)

module.exports = router