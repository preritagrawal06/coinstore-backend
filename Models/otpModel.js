const mongoose = require('mongoose')

const Schema = mongoose.Schema

const otpSchema = new Schema({
    credential: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("OTP", otpSchema)