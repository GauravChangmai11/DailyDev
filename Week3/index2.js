const express = require("express")
const zod = require("zod")
const cors = require("cors")
const mongoose = require("mongoose")
const json = require("jsonwebtoken")
const jwtPassword = "Changmai123"
const port = 3000

const app = express()
app.use(cors(), express.json())

const nameValSchema = zod.string().trim()
const emailValSchema = zod.string().email({message: "Invalid email"})
const passwordValSchema = zod.coerce.string().min(3,{message: "Password must have minimum 3 characters"})
const roleValSchema = zod.enum(["user","admin",""])


mongoose.connect("mongodb://127.0.0.1:27017/mydb1")
.then(()=>{
    console.log("Connected to Database");
})
.catch((e)=>{
    console.log("Error connecting to the database. ", e);
})

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    } 
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User",userSchema)

app.post('/signup',async (req,res)=>{
    let userName = req.body.username
    let emailInput = req.body.email
    let passwordInput = req.body.password
    let roleInput = req.body.role

    const nameVal = nameValSchema.safeParse(userName)
    const emailVal = emailValSchema.safeParse(emailInput)
    const passwordVal = passwordValSchema.safeParse(passwordInput)
    const roleVal = false
    if(roleInput){
        roleVal = roleValSchema.safeParse(roleInput)
    }

    if(!nameVal.success){
        res.status(422).json({
            msg: "Invalid name"
        })
    } else if (!emailVal.success){
        res.status(422).json({
            msg: "Invalid email"
        })
    } else if (!passwordVal.success){
        res.status(422).json({
            msg: "Password must contain minimum 3 characters"
        })
    } else if (roleInput && !roleVal.success){
        res.status(422).json({
            msg: "Role must be either user or admin"
        })
    } else {
        let user = await User.findOne({email: emailInput})
        if(user){
            res.status(400).json({
                msg: "User already exists"
            })
        } else {
            const userRecord = new User({
                name: userName,
                email: emailInput,
                password: passwordVal.data,
                role: roleInput
            })

            try{
                userRecord.save()

                res.status(200).json({
                    msg: "User stored successfully"
                })
            } catch (e){
                console.log("Error occured while saving user ",e);
                res.status(400).json({
                    msg: "Unable to save user"
                })
            }
        }
    }
})

app.get('/signin',async (req,res)=>{
    let username = req.body.username
    let password = req.body.password

    const usernameVal = nameValSchema.safeParse(username)
    const passwordVal = passwordValSchema.safeParse(password)

    if(!usernameVal.success){
        res.status(422).json({
            msg: "Invalid Username"
        })
    } else if(!passwordVal.success){
        res.status(422).json({
            msg: "Invalid password"
        })
    } else {
        try{
            const user = await User.findOne({name: username, password: password})
            if(user){
                const token = json.sign({username: username},jwtPassword)
                res.status(200).json({
                    msg: "Success",
                    token: token
                })
            } else {
                res.status(400).json({
                    msg: "Invalid Credentials"
                })
            }
        } catch(e) {
            console.log("An error occured while signing in ",e);
            res.status(400).json({
                msg: "Failed. Please try again later"
            })
        }
    }
}) 

app.get('/allusers',async (req,res)=>{
    let token = req.headers.authorization

    if(token){
        try{
            const decoded = json.verify(token,jwtPassword)
            console.log("decoded ",decoded);
            const username = decoded.username
            
            let users = await User.find({})
            if(users){
                
                let userList = users.filter(user=>{
                    if(user.name == username)
                        return false
                    return true
                }).map(user=>({
                    name: user.name,
                    email: user.email
                }))
                
                res.status(200).json({
                    msg: "Success",
                    data: userList
                })
            } else {
                res.status(400).json({
                    msg: "No user found"
                })
            }
        } catch (e){
            console.log("Error occured ",e);
            res.status(400).json({
                msg: "Invalid Token"
            })
        }
    } else {
        res.status(401).json({
            msg: "Invalid token"
        })
    }
})
    
app.use((err,req,res,next)=>{
res.status(400).json({
    msg: "Oops! An error occured. Please try later."
})
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})