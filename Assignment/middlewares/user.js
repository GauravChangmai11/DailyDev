const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")

function userMiddleware(req,res,next){
    let token = req.headers.authorization
    let jwtToken = token.split(" ")[1]
    let decoded;
    try{
        decoded = jwt.verify(jwtToken,JWT_SECRET)
    } catch(e){
        console.log("error ",e);
    }

    if(decoded.username){
        req.user = decoded.username
        next()
    } else {
        res.status(403).json({msg: "You are not authorized to access this page."})
    }
}

module.exports = userMiddleware