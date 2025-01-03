const generateOTP = async()=>{
    try {
        return ( otp = `${Math.floor(Math.random()*900000 + 100000)}`)
    } catch (error) {
        throw error
    }
}

module.exports = generateOTP