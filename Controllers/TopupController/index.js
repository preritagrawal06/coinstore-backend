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

module.exports = {getAllGames}

// "headers": {
//     "Accept": "application/json, text/plain, */*",
//     "Content-Type": "application/json",
//     "Origin": "https://google.com",
//     "User-Agent": "axios/1.7.7",
//     "Content-Length": "365",
//     "Accept-Encoding": "gzip, compress, deflate, br"
// },