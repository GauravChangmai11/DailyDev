const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const zod = require('zod')
const jwtPassword = "Changmai123"
const port = process.env.port || 3000
app = express()
app.use(express.json())

const emailSchema = zod.string().email()
const passwordSchema = zod.string().min(5)

try{
    mongoose.connect("mongodb+srv://user123:XSj6zEFxDnhPU9LT@mongocluster.bbr17.mongodb.net/user_app")
}
catch(err){
    console.error("Error connecting to the database");
}

const User = mongoose.model('Users', {
    name: String,
    email: String,
    password: String
})

let requestsCount = {}
setTimeout(()=>{
    requestsCount = {}
},5000)

app.use((req,res,next)=>{
    const userId = req.headers.userid
    if(requestsCount[userId]){
        requestsCount[userId] = requestsCount[userId] + 1
        if(requestsCount[userId]>2){
            return res.status(403).json({
                msg: "Requests Limit Reached",
                success : false
            })
        }
        else next()
    }
    else {
        requestsCount[userId] = 1
        next()
    }
})

const users = [
    {
        "userame" : "Ayan Chatterjee",
        "password" : "Ayan123",
        "email" : "ayan@gmail.com"
    },
    {
        "username" : "Arun Chunarkar",
        "password" : "Arun123",
        "email" : "arun@gmail.com"
    },
    {
        "username" : "Supriya Gogoi",
        "password" : "Supriya123",
        "email" : "supriya@gmail.com"
    }
]

app.post('/signUp', async (req,res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const validateEmail = emailSchema.safeParse(email)
    const validatePassword = passwordSchema.safeParse(password)

    if(!validatePassword.success){
        return res.status(403).json({
            msg: "Incorrect Password Format",
            success: false
        })
    }

    else if(!validateEmail.success){
        return res.status(403).json({
            msg: "Incorrect Email format",
            success: false
        })
    }

    const existingUser = await User.findOne({email: email})
    if(existingUser){
       return res.status(400).json({
            msg: "User already exists."
        })
    }
    const user = new User({
        name: username,
        email: email,
        password: password
    })

    user.save()
    res.json({
        msg: "User Added",
        success: true
    })
})

app.post('/signIn',async (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    const existingUser = await User.findOne({name: username, password: password})
    if(existingUser){
        const token = jwt.sign({username : username}, jwtPassword)
        return res.json({
            msg: "Success",
            token : token
        })
    }

    return res.status(403).json({
        msg: "Incorrect Credentials."
    })


})

app.get("/users",(req,res)=>{
    const token = req.headers.authorization
    try{
        const decoded = jwt.verify(token, jwtPassword)
        const username = decoded.username 
        allUsers = users.filter((user)=>{
            if(user.name == username)
                return false
            else return true
        })
        res.json({
            msg: "Success",
            success: true,
            data: allUsers
        })
    }
    catch(err){
        return res.status(403).json({
            msg: 'Incorrect token', 
        })
    }
})

app.listen(port,()=>{
    console.log("Server is listening on port ", port);
})