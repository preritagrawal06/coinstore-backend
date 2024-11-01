const {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields, resellerTopup, getSmileGames, updateTopup} = require('../Controllers/TopupController')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)
router.get('/get_available_games/smileone', getSmileGames)
router.post('/get-topup-list', getGameTopupList)
router.post('/check-id', checkGameID)
router.post('/get-required-fields', getRequiredGameFields)
router.post('/create-topup-order', resellerTopup)
router.post('/update-topup', updateTopup) // TODO: add admin access middleware
module.exports = router