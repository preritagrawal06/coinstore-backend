const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SellerSchema = new Schema({
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
    listed_accounts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Account",
        }
    ],
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Seller", SellerSchema)