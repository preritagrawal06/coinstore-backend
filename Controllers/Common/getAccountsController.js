const { Seller } = require("../../Models/index");

const getAccountsController = async(req, res, next)=>{
    
    try {
        const {userId} = req.user;
        const accounts = await Seller.findById(userId).populate('listed_accounts').select('listed_accounts')
        return res.json({
            success: true,
            accounts: accounts.listed_accounts
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = getAccountsController