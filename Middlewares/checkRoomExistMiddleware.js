const {Room} = require('../Models')

const checkRoomExist = async(req, res, next)=>{
    const {buyerId, sellerId} = req.body

    const uid = buyerId+sellerId
    const roomExist = await Room.findOne({uid: uid})
    if(roomExist){
        return res.json({
            success: false,
            message: "Room already exist"
        })
    }
    else{
        next()
    }
}

module.exports = checkRoomExist