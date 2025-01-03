const { Otp } = require("../../Models")
const generateOTP = require("../../utils/generateOTP")
const bcrypt = require('bcryptjs')
const sendOTPViaPhone = require("../../utils/sendOTPViaPhone")

const sendOTP = async(req, res)=>{
    try {
        const {credential} = req.body
        if(!credential){
            throw new Error("Please provide details")
        }
        const userOtp = await Otp.find({credential: credential}).sort({createdAt: 1})
        if(userOtp.length > 0 && userOtp[0].expiresAt > Date.now()){
            return res.json({
                message: "OTP is already sent"
            })
        }
        const otp = await generateOTP()
        // console.log(otp);
        const hashedOTP = await bcrypt.hash(otp, 10)
        // console.log(hashedOTP);
        const newOtp = new Otp({
            credential,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 1000*60*60,
            purpose: "phone"
        })
        await newOtp.save()
        const result = await sendOTPViaPhone(credential, otp)
        return res.json({
            ...result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error while sending OTP"
        })
    }
}

module.exports = sendOTP