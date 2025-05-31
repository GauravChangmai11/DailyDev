const express = require("express")
const { signup, signin, transaction } = require("../services/userService")
const authenticateToken = require("../middlewares/auth")
const userRouter = express.Router()

userRouter.post("/signup",async (req,res)=>{
    try{
        const {firstName, lastName, email, password} = req.body
        const result = await signup(email,password,firstName,lastName)
        res.status(200).json({success:true,data:result})
    } catch(e){
        res.status(400).json({success:false, message:e})
    }
})

userRouter.post('/signin',async(req,res)=>{
    try{
        const {email,password} = req.body
        const response = await signin(email,password)
        if(response.success){
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }
    } catch(e){
        res.status(400).json({message:e})
    }
})

userRouter.post('/transaction',authenticateToken,async(req,res)=>{
    try{
        const {recipientId, senderId, amount} = req.body
        const response = await transaction(senderId, recipientId, amount)
        if(response.success){
            res.status(200).json(response)
        } else {
            res.status(400).json(response)
        }

    } catch(e){
        res.status(400).json({success:false,message:"Error in transaction",error:e})
    }
})

module.exports = userRouter