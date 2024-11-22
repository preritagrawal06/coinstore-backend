const { default: axios } = require("axios")
const { Transaction, Buyer, Topup } = require("../../Models")
const crypto = require('crypto')

const md5Sign = (data, key) => {
    const sortedKeys = Object.keys(data).sort();
    let stringToSign = '';
    for (const key of sortedKeys) {
        stringToSign += `${key}=${data[key]}&`;
    }
    stringToSign += key;
    return crypto.createHash('md5').update(crypto.createHash('md5').update(stringToSign).digest('hex')).digest('hex');
}

const topupThroughWallet = async(req, res)=>{
    try {
        const {userId} = req.user
        const {game, userid, serverid, denom, amount, provider, topupId} = req.body
        const user = await Buyer.findById(userId)
        const topup = await Topup.findById(topupId)
        if(topup.amount !== amount){
            return res.json({
                success: false,
                message: "The amount is incorrect!"
            })
        }
        
        if(user.wallet >= amount){
            if(provider === 'elitedias'){
                const { data: balance } = await axios.post(
                    "https://dev.api.elitedias.com/elitedias_api_balance",
                    {
                        api_key: process.env.API_KEY,
                    },
                    {
                        headers:{
                            Origin: 'https://google.com'
                        }
                    }
                );
                if(balance.code === "200" && balance.reseller_balance < amount){
                    return res.json({
                        success: false,
                        message: "Cannot process the transaction right now due to insufficient balance"
                    })
                }
                const {data} = await axios.post("https://dev.api.elitedias.com/elitedias_reseller_topup_api",{
                    api_key: process.env.API_KEY,
                    game: game,
                    userid: userid,
                    serverid: serverid,
                    denom: denom
                },{
                    headers:{
                        Origin: "https://google.com"
                    }
                })
                if(data.code === "200"){
                    const transaction = new Transaction({
                        amount: amount,
                        customerEmail: user.email,
                        customerName: user.username,
                        customerPhone: user.phone,
                        game,
                        itemName: denom,
                        orderid: Date.now()+userId.split(-5),
                        paymentStatus: "success",
                        serverid: serverid || "",
                        transactionDate: new Date(),
                        userid
                    })
        
                    transaction.save().then(async(txn)=>{
                        await Buyer.findOneAndUpdate({email: txn.customerEmail}, {$push: {transactions: txn._id}, $inc: {wallet: -1*amount}},{new: true}).then((user)=>{
                            return res.json({
                                success: true,
                                message: "Topup done successfully",
                                user: {
                                    email: user.email,
                                    phone: user.phone,
                                    username: user.username,
                                    transactions: user.transactions,
                                    orders: user.orders,
                                    wallet: user.wallet
                                }
                            })
                        })
                    }).catch(error => {
                        return res.json({
                            success: false,
                            message: error.message
                        })
                    })
                }else{
                    return res.json(data)
                }
            }else if(provider === 'smileone'){
    
                let payload = {
                    "email": process.env.SMILE_EMAIL,
                    "uid": process.env.SMILE_UID,
                    "userid": userid,
                    "zoneid": serverid,
                    "product": "mobilelegends",
                    "productid": denom,
                    "time": Math.floor(Date.now()/1000)
                }
        
                payload.sign = md5Sign(payload, process.env.SMILE_API_KEY)
                const {data} = await axios.post("https://www.smile.one/smilecoin/api/createorder",payload)
                console.log(data);
                if(data.status === 200){
                    const transaction = new Transaction({
                        amount: amount,
                        customerEmail: user.email,
                        customerName: user.username,
                        customerPhone: user.phone,
                        game,
                        itemName: denom,
                        orderid: data.order_id,
                        paymentStatus: "success",
                        serverid: serverid || "",
                        transactionDate: new Date(),
                        userid
                    })
        
                    transaction.save().then(async(txn)=>{
                        await Buyer.findOneAndUpdate({email: txn.customerEmail}, {$push: {transactions: txn._id}, $inc: {wallet: -1*amount}},{new: true}).then((user)=>{
                            return res.json({
                                success: true,
                                message: "Topup done successfully",
                                user: {
                                    email: user.email,
                                    phone: user.phone,
                                    username: user.username,
                                    transactions: user.transactions,
                                    orders: user.orders,
                                    wallet: user.wallet
                                }
                            })
                        })
                    }).catch(error => {
                        return res.json({
                            success: false,
                            message: error.message
                        })
                    })
                }else{
                    return res.json(data)
                }
            }
        }else{
            return res.json({
                success: false,
                message: "Low wallet balance"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = topupThroughWallet