const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopupSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    topupCode: {
        type: String,
        required: true,
        default: true
    },
    gameCode: {
        type: String,
        required: true
    },
    provider: {
        type: string,
        required: true
    }
})

module.exports =  mongoose.model("Topup", TopupSchema)