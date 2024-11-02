const {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields, resellerTopup, getSmileGames, updateTopup, getAllTopups, getTopupById, updateTopupById, updateStatusById} = require('../Controllers/TopupController')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)
router.get('/get_available_games/smileone', getSmileGames)
router.post('/get-topup-list', getGameTopupList)
router.post('/check-id', checkGameID)
router.post('/get-required-fields', getRequiredGameFields)
router.post('/create-topup-order', resellerTopup)
router.get('/update-all-topup', updateTopup) // TODO: add admin access middleware
router.get('/get-all-topup', getAllTopups) // TODO: add admin access middleware
router.post('/get-topup', getTopupById) // TODO: add admin access middleware
router.post('/update-topup', updateTopupById) // TODO: add admin access middleware
router.post('/update-status-topup', updateStatusById) // TODO: add admin access middleware
module.exports = router