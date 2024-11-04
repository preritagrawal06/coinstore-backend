const jwt = require("jsonwebtoken")

const authMiddleWare = async(req, res, next)=>{
    try {
        const token = req.headers.authorization
        // console.log(token)
        if(!token || token.split(" ")[0] !== "Bearer"){
            return res.json({
                success: false,
                message: "Auth token not found"
            })
        }
        
        const authToken = token.split(" ")[1]
        const user = jwt.verify(authToken, "secrethaiyeh")
        // console.log(user)
        if(!user){
            res.json({
                success: false,
                message: "User not verified"
            })
        }
    
        req.user = user
        next();
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

module.exports = authMiddleWare