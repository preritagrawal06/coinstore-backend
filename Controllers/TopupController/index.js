const axios = require('axios')

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
        const {data} = await api.post('https://api.elitedias.com/checkid', {
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

module.exports = {getAllGames, getGameTopupList, checkGameID, getRequiredGameFields}

// "headers": {
//     "Accept": "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//     "Origin": "https://google.com",
//     "User-Agent": "axios/1.7.7",
//     "Content-Length": "365",
//     "Accept-Encoding": "gzip, compress, deflate, br"
// },