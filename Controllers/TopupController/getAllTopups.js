const {Topup} = require('../../Models')

const getAllTopups = (req, res) => {
    try {
        Topup.find().sort({amount: 1}).then(topup => {
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

module.exports = getAllTopups