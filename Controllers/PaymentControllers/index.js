const { default: axios } = require("axios");

const initiatePayment = async (req, res) => {
    try {
        const { amount, gameId, serverId, name, email, phone, game, itemName } = req.body;
        const orderId = serverId ? gameId + "_" + game + "_" + itemName + "_" + Date.now() + "_" + serverId : gameId + "_" + game + "_" + itemName + "_" + Date.now()
        const { data: balance } = await axios.post(
            "https://dev.api.elitedias.com/elitedias_api_balance",
            {
                api_key: "BmTy15AR73CojYFAwuNmiGBRCm0zHU9GTEwr6HimaZTNXj4_K7YoTMF3g0EUX7Q9DezpHsVQc0T-9ziPbj_d6mwMeR1Eoze48fj2glFn4P_SSmY1gaohWB1rasbGc0jkinjZvgPb0EmDFspEErJiawle2f4UlYLpyqgSJnTTTr73d8_dk567PhofNPMPgRRplABir3XcRreu4ImLceio1e_0B3s2hri2cr3DJR1PaQKFmiGg71U0jtMurLuWY86MMC74pG6OMj2-y0ddHPNR872ST_sIWkUyfX7kL6QiTZ_QnD44maChMVTOvqU30xecigyoq5_0bvbPlKnvBjeBEQ",
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
        }else if(balance.code !== "200"){
            return res.json({
                success: false,
                message: "Internal server error"
            })
        }else{
            const {data: currency} = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json')
            if(currency){
                const { data } = await axios.post(
                    "https://paygapi.onegateway.in/payment/initiate",
                    {
                        scannerIncluded: false,
                        orderId: orderId,
                        apiKey: process.env.PAYMENT_API_KEY,
                        amount: (amount*currency["usd"]["inr"]).toFixed(2),
                        paymentNote: `Payment for topup`,
                        customerName: name,
                        customerEmail: email,
                        customerNumber: phone,
                        redirectUrl: `https://shadowcompany.netlify.app/status`,
                    }
                );
                console.log(data);
                res.json(data);
            }
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
        const { data } = await axios.post(
            "https://pay.onegateway.in/payment/status",
            {
                apiKey: process.env.PAYMENT_API_KEY,
                orderId: orderId,
            }
        );

        res.json(data);
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { initiatePayment, paymentStatus };
