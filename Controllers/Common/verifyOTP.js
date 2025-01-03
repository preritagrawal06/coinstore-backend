const { Otp } = require("../../Models")
const bcrypt = require('bcryptjs')

const verifyOTP = async(req, res, next)=>{
    try {
        const {credential, otp} = req.body
        if(!credential || !otp){
            throw new Error("Please provide the correct detail")
        }
        const userOtp = await Otp.find({credential: credential}).sort({createdAt: 1})
        if(!userOtp.length){
            throw Error('User already verified')
        }else if(userOtp[0].expiresAt < Date.now()){
            await Otp.deleteMany({credential: credential})
            throw new Error("OTP has expired! Please retry")
        }else{
            const verifiedOTP = await bcrypt.compare(otp, userOtp[0].otp)

            if(!verifiedOTP){
                throw new Error('Invalid OTP please try again')
            } else{
                await Otp.deleteMany({credential: credential})
                return res.json({
                    success: true,
                    message: "OTP verification successful"
                })
            }
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = verifyOTP