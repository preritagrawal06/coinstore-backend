const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }));

app.use(cors())
// app.use(cloudinaryConfig)
app.get('/', (req, res, next)=>{
    return res.json({
        success: true,
        message: "system is up and running!"
    })
})
const authRouter = require('./Routes/authRoute.routes')
app.use('/api/user', authRouter)
const sellerRouter = require('./Routes/sellerRoute.routes')
app.use('/api/seller', sellerRouter)
const adminRouter = require('./Routes/adminRoute.routes')
app.use('/api/admin', adminRouter)
const buyerRouter = require('./Routes/buyerRoute.routes')
app.use('/api/buyer', buyerRouter)
const topupRouter = require('./Routes/topup.routes')
app.use('/api/topup', topupRouter)


app.listen(8000, ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DB connected")
    }).catch((error)=>{
        console.log(error.message)
    })
})
