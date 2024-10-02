const { createRoom } = require('../Controllers/BuyerControllers')
const { buyerAccessMiddleware, checkRoomExistMiddleware } = require('../Middlewares')
const authMiddleWare = require('../Middlewares/authTokenMiddleware')

const router = require('express').Router()

router.post('/room/create', authMiddleWare, buyerAccessMiddleware, checkRoomExistMiddleware, createRoom)

module.exports = router