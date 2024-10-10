const { default: axios } = require("axios")

const initiatePayment = async(req, res)=>{
    try {
        const {amount, gameId, serverId, name, email, phone, game, itemName} = req.body
        const orderId = gameId+"_"+game+"_"+itemName+"_"+Date.now()
        const {data} = await axios.post("https://paygapi.onegateway.in/payment/initiate",{
            scannerIncluded: false,
            orderId: orderId,
            apiKey: process.env.PAYMENT_API_KEY,
            amount: amount,
            paymentNote: `Payment for topup`,
            customerName: name,
            customerEmail: email,
            customerNumber: phone,
            redirectUrl: "https://google.com"
        })
        console.log(data);
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

const paymentStatus = async(req, res)=>{
    
    try {
        const orderId = req.query.orderId
        // console.log(orderId);
        const {data} = await axios.post('https://pay.onegateway.in/payment/status',{
            apiKey: process.env.PAYMENT_API_KEY,
            orderId: orderId
        })
        
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {initiatePayment, paymentStatus}