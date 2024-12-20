const { default: axios } = require("axios");
const { Topup, Buyer, Transaction } = require("../../Models");

const addToWallet = async (req, res)=>{

    try {
        const {userId} = req.user
        const {amount} = req.body
    
        const user = await Buyer.findById(userId).select('-password')
        const { data } = await axios.post(
            "https://paygapi.onegateway.in/payment/initiate",
            {
                scannerIncluded: true,
                orderId: Date.now()+userId.slice(-5),
                apiKey: process.env.PAYMENT_API_KEY,
                amount: amount,
                paymentNote: "wallet",
                customerName: user.username,
                customerEmail: user.email,
                customerNumber: user.phone,
                redirectUrl: `https://shadowcompany.in/status`,
            }
        );
        res.json(data)
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const initiatePayment = async (req, res) => {
    try {
        const { amount, gameId, serverId, name, email, phone, game, itemName, agent, topupId } = req.body;
        const orderId = serverId ? gameId + "-" + game + "-" + itemName + "-" + Date.now() + "-" + serverId : gameId + "-" + game + "-" + itemName + "-" + Date.now()
        const topup = await Topup.findById(topupId)
        if(topup.amount !== amount){
            return res.json({
                success: false,
                message: "The amount is incorrect!"
            })
        }
        if(agent === 'elitedias'){
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
            const { data: usdData } = await axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json")
            if(balance.code === "200" && balance.reseller_balance*usdData.usd.inr < amount){
                return res.json({
                    success: false,
                    message: "Cannot process the transaction right now due to insufficient balance"
                })
            }else if(balance.code !== "200"){
                return res.json({
                    success: false,
                    message: "Internal server error"
                })
            }else{
                const { data } = await axios.post(
                    "https://paygapi.onegateway.in/payment/initiate",
                    {
                        scannerIncluded: true,
                        orderId: orderId,
                        apiKey: process.env.PAYMENT_API_KEY,
                        amount: amount,
                        paymentNote: agent,
                        customerName: name,
                        customerEmail: email,
                        customerNumber: phone,
                        redirectUrl: `https://shadowcompany.in/status`,
                    }
                );
                console.log(data);
                res.json(data);
            }
        }else if(agent === 'smileone'){
            const { data } = await axios.post(
                "https://paygapi.onegateway.in/payment/initiate",
                {
                    scannerIncluded: true,
                    orderId: orderId,
                    apiKey: process.env.PAYMENT_API_KEY,
                    amount: amount,
                    paymentNote: agent,
                    customerName: name,
                    customerEmail: email,
                    customerNumber: phone,
                    redirectUrl: `https://shadowcompany.in/status`,
                }
            );
            console.log(data);
            res.json(data);
            
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

const paymentStatus = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        // console.log(orderId);
        const mode = req.query.mode
        
        if(mode === 'wallet'){
            Transaction.findOne({orderid: orderId}).then((txn)=>{ 
                res.json({
                    success: true,
                    data: {
                        status: "success",
                        createdAt: txn.transactionDate,
                        orderId: txn.orderid,
                        customerEmail: txn.customerEmail,
                        customerName: txn.customerName,
                        customerPhone: txn.customerPhone,
                        userId: txn.userid,
                        serverId: txn.serverid,
                        game: txn.game,
                        amount: txn.amount,
                        itemName: txn.itemName
                    }
                })
            })
        }else{
            const { data } = await axios.post(
                "https://pay.onegateway.in/payment/status",
                {
                    apiKey: process.env.PAYMENT_API_KEY,
                    orderId: orderId,
                }
            );
    
            res.json(data);
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: error.message,
            data: {status: "failed"}
        });
    }
};

module.exports = { initiatePayment, paymentStatus, addToWallet };
