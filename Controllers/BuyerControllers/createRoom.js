const {Room} = require('../../Models')

const createRoom = async(req, res)=>{
    const {buyerId, sellerId} = req.body

    const uid = buyerId+sellerId
    const participants = [
        {
            participantId: buyerId,
            participantType: "BUYER"
        },
        {
            participantId: sellerId,
            participantType: "SELLER"
        },
        {
            participantId: "admin ID",
            participantType: "ADMIN"
        },
    ]

    const room = new Room({participants, uid})

    room.save().then(room => {
        return res.json({
            success: true,
            message: "Room created",
            room
        })
    }).catch((error)=>{
        return res.json({
            success: false,
            message: "Error while creating room",
            error: error.message
        })
    })
}

module.exports = createRoom