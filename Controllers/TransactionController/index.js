const Transaction = require('../../Models/transactionModel')

const getAllTransactions = (req, res)=>{
    try {
        Transaction.find().then((transactions)=>{
            return res.josn({
                success: true,
                transactions
            })
        }).catch(error => {
            return res.josn({
                success: false,
                message: "Cannot retrieve transactions right now",
                reason: error.message
            })
        })
    } catch (error) {
        return res.josn({
            success: false,
            message: error.message
        })
        
    }
}

const getTransaction = (req, res)=>{

    const {userid} = req.body

    try {
        Transaction.find({userid: userid}).then(transaction=>{
            return res.json({
                success: true,
                transaction
            })
        }).catch(error => {
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

module.exports = {getAllTransactions, getTransaction}