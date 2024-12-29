const { default: axios } = require("axios")
const { Buyer, Transaction } = require("../../Models")
const {purchaseTotal, depositTotal, purchaseEachDay, newUserEachDay} = require("./aggregationQuery")

const dashboardDetails = async(req, res)=>{

    const userCount = await Buyer.countDocuments()
    const deposit = await Transaction.aggregate(depositTotal)
    const purchase = await Transaction.aggregate(purchaseTotal)
    const purchaseGraph = await Transaction.aggregate(purchaseEachDay)
    const userGraph = await Buyer.aggregate(newUserEachDay)
    let balance
    let usd
    try {
        const {data} = await axios.post('https://dev.api.elitedias.com/elitedias_api_balance', {
            "api_key": process.env.API_KEY
        },{
            headers:{
                "Origin": "www.google.com"
            }
        })
        const { data: usdData } = await axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json")
        balance = data
        usd = usdData.usd.inr
    } catch (error) {
        balance = null
    }

    return res.json({
        userCount,
        depositTotal: deposit[0],
        purchaseTotal: purchase[0],
        elitediasBalance: (balance.reseller_balance*usd).toFixed(2),
        purchaseGraph,
        userGraph
    })

}

module.exports = dashboardDetails