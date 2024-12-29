const { approveSellerController, walletAction, dashboardDetails } = require('../Controllers/AdminControllers')
const { addAnnouncement, deleteAnnouncement } = require('../Controllers/AnnouncementController')
const { getAllTransactions, getTransaction } = require('../Controllers/TransactionController')
const { adminAccessMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.post('/verify', authMiddleWare, adminAccessMiddleware, approveSellerController)
router.get('/transaction/getall', authMiddleWare, adminAccessMiddleware, getAllTransactions)
router.get('/dashboard', authMiddleWare, adminAccessMiddleware, dashboardDetails)
router.post('/transaction/getone', authMiddleWare, adminAccessMiddleware, getTransaction)
router.post('/wallet-action', authMiddleWare, adminAccessMiddleware, walletAction)
router.post('/add-announcement', authMiddleWare, adminAccessMiddleware, addAnnouncement)
router.post('/delete-announcement', authMiddleWare, adminAccessMiddleware, deleteAnnouncement)

module.exports = router