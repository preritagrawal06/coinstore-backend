const { Buyer } = require("../Models")

const buyerAccessMiddleware = async(req, res, next)=>{
    const {userId} = req.user

    const user = await Buyer.findById(userId).select('-password')
    // console.log(user)
    if(!user){
        return res.json({
            success: false,
            message: "user not found"
        })
    }
    next();
}

module.exports = buyerAccessMiddleware