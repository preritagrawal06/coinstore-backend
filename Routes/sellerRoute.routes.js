const router = require('express').Router()
const {postAccountController} = require('../Controllers/SellerControllers')
const {getAccountController, getAccountsController} = require('../Controllers/Common')
const {authMiddleware, sellerAccessMiddleware} = require('../Middlewares')

router.get('/accounts', authMiddleware, sellerAccessMiddleware, getAccountsController)
router.get('/account/:accountId', authMiddleware, sellerAccessMiddleware, getAccountController)
router.post('/account', authMiddleware, sellerAccessMiddleware, postAccountController)

module.exports = router