const { approveSellerController } = require('../Controllers/AdminControllers')
const { getAllTransactions, getTransaction } = require('../Controllers/TransactionController')
const { adminAccessMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.post('/verify', authMiddleWare, adminAccessMiddleware, approveSellerController)
router.get('/transaction/getall', authMiddleWare, adminAccessMiddleware, getAllTransactions)
router.post('/transaction/getone', authMiddleWare, adminAccessMiddleware, getTransaction)

module.exports = router