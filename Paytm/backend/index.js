const express = require("express")
const mongoConn = require("./db/mongoConnection")
const UserRouter = require("./routers/userRouter")
require("dotenv").config()
const port = 3000

const app = express()
app.use(express.json())
app.use("/user",UserRouter)

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Hello World"
    })
})

mongoConn().then(()=>{
    app.listen(port,()=>{
        console.log("Backend Started");
    })
}).catch((err)=>{
    console.log("Error connecting to DB");
})