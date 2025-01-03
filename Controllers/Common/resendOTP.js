const { Otp } = require("../../Models")
const generateOTP = require("../../utils/generateOTP")
const bcrypt = require('bcryptjs')
const sendOTPViaPhone = require("../../utils/sendOTPViaPhone")

const resendOTP = async(req, res)=>{
    try {
        const {credential} = req.body
        if(!credential){
            throw new Error("Please provide details")
        }
        await Otp.deleteMany({credential: credential})
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
        console.log(error.response.data);
        return res.json({
            success: false,
            message: error.response.data.msg
        })
    }
}

module.exports = resendOTP