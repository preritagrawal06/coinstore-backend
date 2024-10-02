const axios = require('axios')
const { wrapper } = require('axios-cookiejar-support');
const tough = require('tough-cookie');

// Create a cookie jar to store cookies
const cookieJar = new tough.CookieJar();

// Wrap Axios instance to support cookie jar
const client = wrapper(axios.create({ jar: cookieJar }));

const api = axios.create({
    baseURL: "https://dev.api.elitedias.com",
    headers:{
        Origin: "https://google.com",
        "Content-Type": "application/json",
        Accept: "*/*",
        "Cache-Control": "no-cache",
        Host: "dev.api.elitedias.com",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Content-Length": "365" 
    },
})

const getAllGames = async (req, res, next)=>{

    try {
        const {data} = await api.post('/elitedias_games_available', {
            "api_key": process.env.API_KEY,
        })
        
        
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