const {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields, resellerTopup, getSmileGames, updateTopup, getAllTopups, getTopupById, updateTopupById, updateStatusById, deleteTopupById, addNewTopup} = require('../Controllers/TopupController')
const { authMiddleware, adminAccessMiddleware } = require('../Middlewares')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)
router.get('/get_available_games/smileone', getSmileGames)
router.post('/get-topup-list', getGameTopupList)
router.post('/check-id', checkGameID)
router.post('/get-required-fields', getRequiredGameFields)
router.post('/create-topup-order', resellerTopup)
router.post('/update-all-topup', authMiddleware, adminAccessMiddleware, updateTopup) // TODO: add admin access middleware
router.get('/get-all-topup', authMiddleware, adminAccessMiddleware, getAllTopups) // TODO: add admin access middleware
router.post('/get-topup', authMiddleware, adminAccessMiddleware, getTopupById) // TODO: add admin access middleware
router.post('/update-topup', authMiddleware, adminAccessMiddleware, updateTopupById) // TODO: add admin access middleware
router.post('/delete-topup', authMiddleware, adminAccessMiddleware, deleteTopupById) // TODO: add admin access middleware
router.post('/create-topup', authMiddleware, adminAccessMiddleware, addNewTopup) // TODO: add admin access middleware
router.post('/update-status-topup', authMiddleware, adminAccessMiddleware, updateStatusById) // TODO: add admin access middleware
module.exports = router