const express = require("express")
const cors = require("cors")
const port = 3000
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")
const app = express()

app.use(cors(),express.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)

app.use((req,res,next)=>{
    res.status(404).json({msg:"Oops! Page not found."})
})

app.use((err,req,res,next)=>{
    res.status(400).json({msg: "Oops! Bad Request. Check the request."})
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})