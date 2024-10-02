const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    senderType: {
        type: String,
        required: true,
        enum: ["SELLER", "BUYER"]
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: function(){
            return this.senderType === 'SELLER' ? 'SELLER' : 'BUYER'
        }
    },
    receiver: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: function(){
            return this.senderType !== 'SELLER' ? 'SELLER' : 'BUYER'
        }
    },
    message: {
        type: String,
        required: true
    },
    roomId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Room"
    }
}, {timestamps: true})

module.exports = mongoose.model("Chat", chatSchema)