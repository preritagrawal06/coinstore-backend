const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    participants: [
        {
            participantId: Schema.Types.ObjectId,
            participantType: {
                type: String,
                enum: ["SELLER", "BUYER", "ADMIN"]
            }
        }
    ],
    uid: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Room', roomSchema)