const { Seller } = require("../Models")

const sellerAccessMiddleware = async(req, res, next)=>{
    const {userId} = req.user

    const user = await Seller.findById(userId).select('-password')
    // console.log(user)
    if(!user){
        return res.json({
            success: false,
            message: "user not found"
        })
    } else if(!user.isVerified){
        return res.json({
            success: false,
            message: "Your account is not verified yet"
        })
    }
    next();
}

module.exports = sellerAccessMiddleware