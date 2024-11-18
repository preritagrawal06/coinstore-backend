const { default: axios } = require("axios")
const { Buyer, Transaction } = require("../../Models")

const addMoneyToWallet = async(req, res)=>{
    try {
        const {userId} = req.user
        const {paymentData} = req.body
        // console.log(paymentData.orderId);
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
        // console.log(data);
        if(data.success && data.data.status === 'success'){
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
                userid: userId
            })
    
            transaction.save().then(txn => {
                Buyer.findByIdAndUpdate(userId, {$inc: {wallet: paymentData.amount}, $push: {transactions: txn._id}}, {new: true}).then((user)=>{
                    // console.log(user);
                    return res.json({
                        success: true,
                        message: "Money added to wallet",
                        user: {
                            email: user.email,
                            phone: user.phone,
                            username: user.username,
                            transactions: user.transactions,
                            orders: user.orders,
                            wallet: user.wallet
                        }
                    })
                }).catch((error) => {
                    return res.json({
                        success: false,
                        message: error.message
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