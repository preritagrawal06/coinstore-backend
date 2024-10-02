const { Account, Seller } = require("../../Models")

const postAccountController = async(req, res, next)=>{
    
    const {userId} = req.user
    const {account_id, listing_price, game} = req.body

    try {
        const account = new Account({account_id, listed_by: userId, listing_price, game})
        account.save()
        .then((account)=>{
            Seller.findByIdAndUpdate(userId, {$push: {listed_accounts: account._id}})
            .then(()=>{
                return res.json({
                    success: true,
                    message: "New account listed",
                    account
                })
            })
        })
        .catch(error=>{
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

module.exports = postAccountController