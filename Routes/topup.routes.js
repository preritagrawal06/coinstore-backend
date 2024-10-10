const {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields} = require('../Controllers/TopupController')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)
router.post('/get-topup-list', getGameTopupList)
router.post('/check-id', checkGameID)
router.post('/get-required-fields', getRequiredGameFields)
module.exports = router