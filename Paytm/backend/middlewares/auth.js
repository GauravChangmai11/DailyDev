const jwt = require("jsonwebtoken")

const authenticateToken = (req,res,next)=>{
    const authorization = req.headers["authorization"]
    const token = authorization && authorization.split(" ")[1]

    if(!token){
        res.status(401).json({message:"Invalid Token"})
    }
    
    try {
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(e){
        res.status(403).json({message:"Invalid token or token expired"})
    }
}

module.exports = authenticateToken