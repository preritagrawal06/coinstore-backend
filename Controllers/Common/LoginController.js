const {Buyer, Seller, Admin} = require('../../Models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateEmail = require('../../utils/emailValidator')

const loginController = async(req, res, next)=>{
    const {role, email, password} = req.body

    switch (role) {
        case "BUYER":
            if(!email || !password){
                return res.json({
                    success: false,
                    message: "Information missing"
                })
            }
            if(!validateEmail(email)){
                return res.json({
                    success: false,
                    message: "Enter a valid email"
                })
            }
            try {
                const user = await Buyer.findOne({email: email})

                if(!user){
                    return res.json({
                        status: false,
                        message: "User not found!"
                    })
                }

                const passCheck = await bcrypt.compare(password, user.password)

                if(!passCheck){
                    return res.json({
                        success: false,
                        message: "Password doesn't match!!"
                    })
                }
                const token = jwt.sign({userId: user._id}, "secrethaiyeh")
                const newUser = {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    wallet: user.wallet,
                    transactions: user.transactions,
                    orders: user.orders,
                    _id: user._id
                }
                return res.json({
                    success: true,
                    token,
                    user: newUser
                })

            } catch (error) {
                return res.json({
                    success: false,
                    message: error.message
                })
            }

        case "SELLER":

            if(!email || !password){
                return res.json({
                    success: false,
                    message: "Information missing"
                })
            }
            if(!validateEmail(email)){
                return res.json({
                    success: false,
                    message: "Enter a valid email"
                })
            }
            try {
                const user = await Seller.findOne({email: email})

                if(!user){
                    return res.json({
                        status: false,
                        message: "User not found!"
                    })
                }

                const passCheck = await bcrypt.compare(password, user.password)

                if(!passCheck){
                    return res.json({
                        success: false,
                        message: "Password doesn't match!!"
                    })
                }

                const token = jwt.sign({userId: user.id}, "secrethaiyeh")

                return res.json({
                    success: true,
                    token,
                    user
                })

            } catch (error) {
                return res.json({
                    success: false,
                    message: error.message
                })
            }

        case "ADMIN":

            if(!email || !password){
                return res.json({
                    success: false,
                    message: "Information missing"
                })
            }
            if(!validateEmail(email)){
                return res.json({
                    success: false,
                    message: "Enter a valid email"
                })
            }
            try {
                const user = await Admin.findOne({email: email})

                if(!user){
                    return res.json({
                        status: false,
                        message: "User not found!"
                    })
                }

                const passCheck = await bcrypt.compare(password, user.password)

                if(!passCheck){
                    return res.json({
                        success: false,
                        message: "Password doesn't match!!"
                    })
                }

                const token = jwt.sign({userId: user.id}, "secrethaiyeh")
                
                console.log(user);
                return res.json({
                    success: true,
                    token,
                    user
                })

            } catch (error) {
                return res.json({
                    success: false,
                    message: error.message
                })
            }
    
        default:
            return res.json({
                success: false,
                message: "Role not specified"
            })
    }
}

module.exports = loginController