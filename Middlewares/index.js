const authMiddleware = require('./authTokenMiddleware')
const sellerAccessMiddleware = require('./sellerAccessMiddleware')
const adminAccessMiddleware = require('./adminAccessMiddleware')
const buyerAccessMiddleware = require('./buyerAccessMiddleware')
module.exports = {authMiddleware, sellerAccessMiddleware, adminAccessMiddleware, buyerAccessMiddleware}