const axios = require('axios')
const Transaction = require('../../Models/transactionModel')

const api = axios.create({
    baseURL: "https://dev.api.elitedias.com",
})

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
        const {game} = req.body
        const {data} = await api.post('/elitedias_api_denominations', {
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
                customerPhone: paymentData.customerPhone,
                game,
                itemName: denom,
                orderid: paymentData.orderId,
                paymentStatus: paymentData.status,
                serverid: serverid || "",
                transactionDate: paymentData.createdAt,
                userid
            })

            transaction.save().then(()=>{
                return res.json(data)
            }).catch(error => {
                return res.json({
                    success: false,
                    message: error.message
                })
            })
        }else{
            return res.json(data)
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields, resellerTopup}