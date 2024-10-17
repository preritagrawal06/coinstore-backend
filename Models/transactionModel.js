const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    transactionDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    serverid: {
        type: String,
    },
    game: {
        type: String,
        required: true
    },
    orderid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Transaction", transactionSchema)