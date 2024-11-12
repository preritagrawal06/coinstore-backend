const { default: axios } = require("axios")
const { Buyer, Transaction } = require("../../Models")

const addMoneyToWallet = async(req, res)=>{
    try {
        const {userId} = req.user
        const {paymentData} = req.body
        const transaction = await Transaction.findOne({orderid: paymentData.orderId})
        if(transaction){
            return res.json({
                success: true,
                message: "Money added successfully"
            })
        }
        const { data } = await axios.post(
            "https://pay.onegateway.in/payment/status",
            {
                apiKey: process.env.PAYMENT_API_KEY,
                orderId: paymentData.orderId,
            }
        );

        if(data.status === 'success'){
            const transaction = new Transaction({
                amount: paymentData.amount,
                customerEmail: paymentData.customerEmail,
                customerName: paymentData.customerName,
                customerPhone: paymentData.customerNumber,
                game: "wallet",
                itemName: "wallet",
                orderid: paymentData.orderId,
                paymentStatus: paymentData.status,
                serverid: "",
                transactionDate: paymentData.createdAt,
                userid: "wallet"
            })
    
            transaction.save().then(txn => {
                Buyer.findByIdAndUpdate(userId, {$inc: {wallet: amount}, $push: {transactions: txn._id}}).then(()=>{
                    return res.json({
                        success: true,
                        message: "Money added to wallet"
                    }).catch(error => {
                        return res.json({
                            success: false,
                            message: error.message
                        })
                    })
                })
            }).catch(error => {
                return res.json({
                    success: false,
                    message: error.message
                })
            })
        } else{
            return res.json({
                success: false,
                message: "orderID not found"
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = addMoneyToWallet