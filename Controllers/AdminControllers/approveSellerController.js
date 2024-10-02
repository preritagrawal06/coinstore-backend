const { Seller } = require("../../Models")

const approveSellerController = async(req, res, next)=>{
    const {adminId} = req.body

    try {
        Seller.findByIdAndUpdate(adminId, {isVerified: true}).then(()=>{
            return res.json({
                success: true,
                message: "Seller is approved"
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
            message: error.message
        })
    }
}

module.exports = approveSellerController