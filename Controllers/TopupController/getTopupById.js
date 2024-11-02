const {Topup} = require('../../Models')

const getTopupById = (req, res) => {
    try {
        const {topupId} = req.body
        Topup.findById(topupId).then(topup => {
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

module.exports = getTopupById