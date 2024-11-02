const {Topup} = require('../../Models')

const updateTopupById = (req, res) => {
    try {
        const {topupId, game, gameCode, amount, commission, description, provider, topupCode} = req.body
        Topup.findByIdAndUpdate(topupId, {
            game: game,
            gameCode: gameCode,
            amount: amount,
            commission: commission,
            description: description,
            topupCode: topupCode,
            provider: provider
        }).then(topup => {
            return res.json({
                success: true,
                topup
            })
        }).catch((error)=>{
            return res.json({
                success: false,
                message: error.message
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Internal error occured"
        })        
    }
}

module.exports = updateTopupById