const {getAllGames} = require('../Controllers/TopupController')
const router = require('express').Router()

router.get('/get_available_games', getAllGames)

module.exports = router