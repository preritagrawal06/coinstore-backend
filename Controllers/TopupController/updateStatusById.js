const {Topup} = require('../../Models')

const updateStatusById = (req, res) => {
    try {
        const {topupId, isActive} = req.body
        Topup.findByIdAndUpdate(topupId, {isActive: isActive}).then(topup => {
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

module.exports = updateStatusById