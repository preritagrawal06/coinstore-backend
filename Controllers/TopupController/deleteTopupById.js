const {Topup} = require('../../Models')

const deleteTopupById = (req, res) => {
    try {
        const {topupId} = req.body
        Topup.findByIdAndDelete(topupId).then(topup => {
            return res.json({
                success: true,
                message: "Topupp deleted successfully"
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

module.exports = deleteTopupById