const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuyerSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    orders: [
        {
            account_id:{
                type: Schema.Types.ObjectId,
                ref: "Account",
            },
        }
    ],
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
        },
    ],
}, {timestamps: true})

module.exports =  mongoose.model("Buyer", BuyerSchema)