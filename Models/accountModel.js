const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    account_id: { // unique character ID of any game
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    listed_by: {
        type: Schema.Types.ObjectId,
        ref: "Seller"
    },
    listing_price: {
        type: Number,
        required: true
    },
    transaction_detail:[{
        buyer_id: {
            type: Schema.Types.ObjectId,
            ref: "Buyer",
        },
        sold_at: Number,
        transaction_date: Schema.Types.Date
    }]
})

module.exports = mongoose.model('Account', AccountSchema)