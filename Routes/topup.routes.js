const {getAllGames, getGameTopupList, checkGameID} = require('../Controllers/TopupController')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)
router.post('/get-topup-list', getGameTopupList)
router.post('/check-id', checkGameID)

module.exports = router