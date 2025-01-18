const { Topup } = require("../../Models");

const addNewTopup = async (req, res)=>{
    try {
        const {game, commission, amount, description, gameCode, provider, topupCode} = req.body
        const topup = new Topup({
            game: game.trim(),
            commission: commission,
            amount: amount,
            description: description,
            gameCode: gameCode,
            isActive: true,
            provider: provider,
            topupCode: topupCode.trim(),
        });
        topup.save().then(() => {
            return res.json({
                success: true,
                message: "new topup added successfully"
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
            message: "internal server error"
        })
    }
}

module.exports = addNewTopup