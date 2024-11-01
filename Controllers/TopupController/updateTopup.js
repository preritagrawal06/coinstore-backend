const { default: axios } = require("axios");
const { Topup } = require("../../Models");
const crypto = require('crypto')

const games = [
  {
    name: "Mobile Legends",
    code: "mlbb",
  },
  {
    name: "Mobile Legends",
    code: "mlbb_exclusive",
  },
  {
    name: "Mobile Legends",
    code: "mlbb_exclusive_global",
  },
  {
    name: "Mobile Legends",
    code: "mlbb_global",
  },
  {
    name: "PUBG Global",
    code: "pubgm",
  },
  {
    name: "Supersus",
    code: "super_sus",
  },
  {
    name: "Clash of Clans",
    code: "clashofclans",
  },
  {
    name: "Clash Royale",
    code: "clashroyale",
  },
  {
    name: "Farlight",
    code: "farlight84",
  },
  {
    name: "Honkai:Star Rail",
    code: "honkai_star_rail",
  },
  {
    name: "Genshin Impact",
    code: "genshin",
  },
  {
    name: "Brawl Stars",
    code: "brawlstars",
  },
  {
    name: "Honor of Kings",
    code: "hok",
  },
];

const md5Sign = (data, key) => {
    const sortedKeys = Object.keys(data).sort();
    let stringToSign = '';
    for (const key of sortedKeys) {
        stringToSign += `${key}=${data[key]}&`;
    }
    stringToSign += key;
    return crypto.createHash('md5').update(crypto.createHash('md5').update(stringToSign).digest('hex')).digest('hex');
}

const updateTopup = async (req, res) => {
    try {
        await Topup.deleteMany()
        games.forEach(async (game) => {
          const { data } = await axios.post(
            "https://dev.api.elitedias.com/elitedias_api_denominations",
            {
              api_key: process.env.API_KEY,
              game: game.code,
            },
            {
              headers: {
                Origin: "https://google.com",
              },
            }
          );
      
          Object.keys(data).forEach(async (topupCode) => {
            const price = data[topupCode];
            const topup = new Topup({
              game: game.name,
              commission: 0,
              amount: price,
              description: topupCode,
              gameCode: game.code,
              isActive: true,
              provider: "elitedias",
              topupCode: topupCode,
            });
      
            await topup.save();
          });
        });
      
        let payload = {
          uid: process.env.SMILE_UID,
          email: process.env.SMILE_EMAIL,
          time: Math.floor(Date.now() / 1000),
          product: "mobilelegends",
        };
      
        payload.sign = md5Sign(payload, process.env.SMILE_API_KEY);
      
        const { data: smileone } = await axios.post(
          "https://www.smile.one/smilecoin/api/productlist",
          payload
        );
        console.log(smileone);
        if (smileone.status === 200) {
          smileone.data.product.forEach(async(prod)=>{
              const topup = new Topup({
                  game: "Mobile Legends",
                  commission: prod.discount,
                  amount: prod.cost_price,
                  description: prod.spu,
                  gameCode: "mlbb-smileone",
                  isActive: true,
                  provider: "smileone",
                  topupCode: prod.id,
                });
          
              await topup.save();
          })
        }

        return res.json({
            succes: true,
            message: "Topup updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error
        })
    }
};

module.exports = updateTopup
