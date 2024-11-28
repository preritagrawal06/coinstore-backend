const { Buyer, Transaction } = require("../../Models")

const walletAction = async(req, res)=>{
    try {
        const {phone, action, amount, reason} = req.body
    
        const user = await Buyer.findOne({phone: phone})
        if(!user){
            return res.json({
                success: false,
                message: "user not found"
            })
        }
        const type = action === 'credit' ? 1 : -1
        const transaction = new Transaction({
            amount,
            customerEmail: user.email,
            customerName: user.name,
            customerPhone: user.phone,
            game: "wallet",
            itemName: reason,
            paymentStatus: "success",
            userid: user._id,
            orderid: Date.now()+user._id.toString().slice(-5),
            serverid: "",
            transactionDate: new Date(),
            logs: {
                paymentLog:JSON.stringify({payment: "wallet", reason: reason}),
                providerLog: JSON.stringify({success: true, provider: "Admin"})
            },
        })
    
        transaction.save().then(async(txn)=>{
            await Buyer.findOneAndUpdate({phone: phone},{$inc: {wallet: type*amount}, $push: {transactions: txn._id}})
            return res.json({
                success: true,
                message: "SC Coins add to wallet"
            })
        }).catch((error)=>{
            return res.json({
                success: false,
                message: error.message
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = walletAction