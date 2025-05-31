const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const { Error, ClientSession } = mongoose
const User = require("../db/models")

const signup = async(email, password, firstName, lastName)=>{
    const userExists = await User.findOne({
        email:email
    })

    if(userExists){
        throw new Error("User already Exists")
    }

    const hashPassword = await bcrypt.hash(password,Number(process.env.BCRYPT_SALT))

    let user = new User({
        email,
        firstName,
        lastName,
        password: hashPassword,
    })

    await user.save()
    
    return {success:true,user:{id:user._id, email:email}}
}

const signin = async (email, password)=>{
    const user = await User.findOne({
        email:email
    })
    
    if(!user){
        return {success:false, message:"User does not exist."}
    }
    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword){
        return {success:false,message:"Incorrect Password"}
    }

    const token = jwt.sign({email:email,id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return {success:true, data:{token:token}}
}

const transaction = async (senderId, recipientId, amount)=>{
    const session = await mongoose.startSession()
    try{
        await session.startTransaction()
        const sender = await User.findById(senderId).session(session)
        const recipient = await User.findById(recipientId).session(session)

        console.log("sender ", sender);
        console.log("recipient ", recipient);

        if(!sender){
            throw new Error("Invalid Sender")
        }
        if(!recipient){
            throw new Error("Invalid Recipient")
        }
        if(sender.amount<amount){
            throw new Error("Insufficient Funds")
        }

        sender.amount -=amount
        recipient.amount+=amount

        await sender.save()
        await recipient.save()

        await session.commitTransaction()
        session.endSession()

        return {success:true, message:"Transaction Completed"}

    } catch(e){
        console.log("error caught ", e);
        await session.abortTransaction()
        session.endSession()
        return {success:false, error:String(e)}
    }
}

module.exports={signup,signin, transaction}