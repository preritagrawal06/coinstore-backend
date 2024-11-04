const {Buyer, Seller, Admin} = require('../../Models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

const SignupController = async(req, res, next)=>{
    const {role, username, email, phone, password} = req.body

    switch (role) {
        case "BUYER":
            if(!username || !email || !phone || !password){
                return res.json({
                    success: false,
                    message: "Information missing"
                })
            }

            try {
                const exist = await Buyer.findOne({email: email})

                if(exist){
                    return res.json({
                        status: false,
                        message: "User already exist!"
                    })
                }
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const user = new Buyer({username, email, phone, password: hash})
                user.save()
                    .then((user)=>{
                        console.log(user)
                        const token = jwt.sign({userId: user.id}, "secrethaiyeh")
                        return res.json({
                            success: true,
                            token,
                            user
                        })
                    })
                    .catch((error)=>{
                        return res.json({
                            success: false,
                            message: error.message
                        })
                    })

            } catch (error) {
                return res.json({
                    success: false,
                    message: error.message
                })
            }
            break;
        case "ADMIN":
            if(!username || !email || !password){
                return res.json({
                    success: false,
                    message: "Information missing"
                })
            }

            try {
                const exist = await Admin.findOne({email: email})

                if(exist){
                    return res.json({
                        status: false,
                        message: "User already exist!"
                    })
                }
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                const user = new Admin({username, email, password: hash})
                user.save()
                    .then((user)=>{
                        console.log(user)
                        const token = jwt.sign({userId: user.id}, "secrethaiyeh")
                        return res.json({
                            success: true,
                            token,
                            user
                        })
                    })
                    .catch((error)=>{
                        return res.json({
                            success: false,
                            message: error.message
                        })
                    })

            } catch (error) {
                return res.json({
                    success: false,
                    message: error.message
                })
            }
            break;

        case "SELLER":
            if(!username || !email || !phone || !password){
                return res.json({
                    success: false,
                    message: "Information missing"
                })
            }

            try {
                const exist = await Seller.findOne({email: email})

                if(exist){
                    return res.json({
                        status: false,
                        message: "User already exist!"
                    })
                }
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                // console.log(req.file);

                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "documents"
                })

                console.log(result);

                // return res.json(result)

                const user = new Seller({username, email, phone, password: hash, doc_url: result.secure_url})
                user.save()
                    .then((user)=>{
                        console.log(user)
                        const token = jwt.sign({userId: user.id}, "secrethaiyeh")
                        return res.json({
                            success: true,
                            token,
                            user
                        })
                    })
                    .catch((error)=>{
                        return res.json({
                            success: false,
                            message: error.message
                        })
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

module.exports = SignupController