const { Buyer } = require("../../Models")

const getTransactions = (req, res)=>{
    const {userId} = req.user

    Buyer.findById(userId).select('-password').populate('transactions').then(user => {
        return res.json({
            success: true,
            transaction: user.transactions
        })
    }).catch(error =>{
        console.log(error.message);
        return res.json({
            success: false,
            message: error.message
        })
    })
}

module.exports = getTransactions