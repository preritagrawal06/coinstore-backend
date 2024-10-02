const { Admin } = require("../Models")

const adminAccessMiddleware = async(req, res, next)=>{
    const {userId} = req.user

    const user = await Admin.findById(userId).select('-password')
    // console.log(user)
    if(!user){
        return res.json({
            success: false,
            message: "user not found"
        })
    }
    next();
}

module.exports = adminAccessMiddleware