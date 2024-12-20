const axios = require('axios')
const Transaction = require('../../Models/transactionModel')
const crypto = require('crypto')
const { Topup, Buyer } = require('../../Models')

const api = axios.create({
    baseURL: "https://dev.api.elitedias.com",
})

const md5Sign = (data, key) => {
    const sortedKeys = Object.keys(data).sort();
    let stringToSign = '';
    for (const key of sortedKeys) {
        stringToSign += `${key}=${data[key]}&`;
    }
    stringToSign += key;
    return crypto.createHash('md5').update(crypto.createHash('md5').update(stringToSign).digest('hex')).digest('hex');
}

const getSmileGames = async(req, res, next)=>{
    try {

        let payload = {
            "uid": process.env.SMILE_UID,
            "email": process.env.SMILE_EMAIL,
            "time": Math.floor(Date.now()/1000),
            "product": "mobilelegends"
        }

        payload.sign = md5Sign(payload, process.env.SMILE_API_KEY)

        const {data} = await axios.post('https://www.smile.one/smilecoin/api/productlist', payload)
        console.log(data);
        if(data.status === 200){
            return res.json(data)
        }else{
            return res.json({
                success: false,
                message: "Some unknown error occured"
            })
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error
        })
    }
}

const getAllGames = async (req, res, next)=>{
    try {
        const {data} = await api.post('/elitedias_games_available', {
            "api_key": process.env.API_KEY,
        },{
            headers:{
                Origin: "https://google.com"
            }
        })
        if(data.code === '200'){
            return res.json(data)
        }else{
            return res.json({
                success: false,
                message: "Some unknown error occured"
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

const getGameTopupList = async(req, res, next)=>{
    try {
        const { game} = req.body
        Topup.find({game: game, isActive: true}).select('-commission').sort({amount: 1}).then(topup => {
            return res.json(topup)
        }).catch(error => {
            return res.json({
                success: false,
                error: error.message
            })
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

const getRequiredGameFields = async(req, res, next)=>{
    try {
        const {game} = req.body
        const {data} = await axios.post('/elitedias_game_fields', {
            "api_key": process.env.API_KEY,
            game: game
        },{
            headers:{
                Origin: "https://google.com"
            }
        })
        return res.json(data)
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }
}

const checkGameID = async(req, res)=>{
    try {
        const {game, userID, serverID} = req.body
        const {data} = await axios.post('https://api.elitedias.com/checkid', {
            "api_key": process.env.API_KEY,
            userid: userID,
            serverid: serverID || "",
            game: game
        },{
            headers:{
                Origin: "https://google.com"
            }
        })
        return res.json(data)
    } catch (error) {
        return res.json({
            success: false,
            message: error
        })
    }    
}

const resellerTopup = async(req, res)=>{
    try {
        const {game, userid, serverid, denom, paymentData} = req.body
        const transaction = await Transaction.findOne({orderid: paymentData.orderId})
        const { data } = await axios.post(
            "https://pay.onegateway.in/payment/status",
            {
                apiKey: process.env.PAYMENT_API_KEY,
                orderId: paymentData.orderId,
            }
        );
        if(transaction){
            return res.json({
                success: true,
                message: "Top-up done successfully",
                transaction
            })
        }
        else if(data.status !== "success"){
            return res.json({
                success: false,
                message: "orderID not found"
            })
        }
        else if(paymentData.paymentNote === 'elitedias'){
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
                    amount: paymentData.amount,
                    customerEmail: paymentData.customerEmail,
                    customerName: paymentData.customerName,
                    customerPhone: paymentData.customerNumber,
                    game,
                    itemName: denom,
                    orderid: paymentData.orderId,
                    paymentStatus: paymentData.status,
                    serverid: serverid || "",
                    transactionDate: paymentData.createdAt,
                    userid,
                    logs:{
                        paymentLog: JSON.stringify(paymentData),
                        providerLog: JSON.stringify(data)
                    }
                })
    
                transaction.save().then(async(txn)=>{
                    await Buyer.findOneAndUpdate({email: txn.customerEmail}, {$push: {transactions: txn._id}},{new: true}).then((user)=>{
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
                const transaction = new Transaction({
                    amount: paymentData.amount,
                    customerEmail: paymentData.customerEmail,
                    customerName: paymentData.customerName,
                    customerPhone: paymentData.customerNumber,
                    game,
                    itemName: denom,
                    orderid: paymentData.orderId,
                    paymentStatus: "failure",
                    serverid: serverid || "",
                    transactionDate: paymentData.createdAt,
                    userid,
                    logs:{
                        paymentLog: JSON.stringify(paymentData),
                        providerLog: JSON.stringify(data)
                    }
                })
    
                transaction.save().then(async(txn)=>{
                    await Buyer.findOneAndUpdate({email: txn.customerEmail}, {$push: {transactions: txn._id}},{new: true}).then((user)=>{
                        return res.json({
                            success: true,
                            message: "Topup unsuccessful",
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
            }
        }else if(paymentData.paymentNote === 'smileone'){

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
                    amount: paymentData.amount,
                    customerEmail: paymentData.customerEmail,
                    customerName: paymentData.customerName,
                    customerPhone: paymentData.customerPhone,
                    game,
                    itemName: denom,
                    orderid: data.order_id,
                    paymentStatus: paymentData.status,
                    serverid: serverid || "",
                    transactionDate: paymentData.createdAt,
                    userid,
                    logs:{
                        paymentLog: JSON.stringify(paymentData),
                        providerLog: JSON.stringify(data)
                    }
                })
    
                transaction.save().then(async(txn)=>{
                    await Buyer.findOneAndUpdate({email: txn.customerEmail}, {$push: {transactions: txn._id}},{new: true}).then((user)=>{
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
                const transaction = new Transaction({
                    amount: paymentData.amount,
                    customerEmail: paymentData.customerEmail,
                    customerName: paymentData.customerName,
                    customerPhone: paymentData.customerNumber,
                    game,
                    itemName: denom,
                    orderid: paymentData.orderId,
                    paymentStatus: "failure",
                    serverid: serverid || "",
                    transactionDate: paymentData.createdAt,
                    userid,
                    logs:{
                        paymentLog: JSON.stringify(paymentData),
                        providerLog: JSON.stringify(data)
                    }
                })
    
                transaction.save().then(async(txn)=>{
                    await Buyer.findOneAndUpdate({email: txn.customerEmail}, {$push: {transactions: txn._id}},{new: true}).then((user)=>{
                        return res.json({
                            success: true,
                            message: "Topup unsuccessful",
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
            }
        }
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const updateTopup = require('./updateTopup')
const getAllTopups = require('./getAllTopups')
const getTopupById = require('./getTopupById')
const updateTopupById = require('./updateTopupById')
const updateStatusById = require('./updateStatusById')
module.exports = {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields, resellerTopup, getSmileGames, updateTopup, getAllTopups, getTopupById, updateTopupById, updateStatusById}