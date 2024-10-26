const {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields, resellerTopup, getSmileGames} = require('../Controllers/TopupController')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)
router.get('/get_available_games/smileone', getSmileGames)
router.post('/get-topup-list', getGameTopupList)
router.post('/check-id', checkGameID)
router.post('/get-required-fields', getRequiredGameFields)
router.post('/create-topup-order', resellerTopup)
module.exports = router