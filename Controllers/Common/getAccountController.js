const { Account } = require("../../Models")

const getAccountController = async(req, res, next)=>{
    const {userId} = req.user
    const {accountId} = req.params
    Account.findOne({listed_by: userId, _id: accountId})
    .then((account)=>{
        return res.json({
            success: true,
            account
        })
    }).catch((error)=>{
        return res.json({
            success: false,
            message: error.message
        })
    })
}

module.exports = getAccountController