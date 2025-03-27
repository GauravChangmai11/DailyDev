const express = require("express")
const zod = require('zod')
const cors = require('cors')
const fs = require("fs")
const app = express()
const port = process.env.PORT || 3000
const schema = zod.array(zod.number())
var requests = 0

// zod object schema
const objectSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys: zod.array(zod.number())
})

// function using zod object schema
const validateObject = (object)=>{
    return objectSchema.safeParse(object)
}

// count the total requests made
const countRequests = (req,res,next)=>{
    requests++
    // console.log("Total requests made is ",requests);
    next()
}

// count the response time for the api call made (async)
const checkResponseTime = (req,res,next)=>{
    const startTime = Date.now()
    res.on('finish',()=>{
        const time = Date.now() - startTime
        // console.log(`Request to ${req.method} ${req.url} took ${time} ms`);
    })
    next()
}
app.use(cors())
app.use(express.json())
app.use(validateUser,countRequests,checkResponseTime)

// middleware function
function validateUser(req,res,next){
    username = req.query.username
    password = req.query.password
    // console.log("username ",username);
    // console.log("password ",password);
    if(username != "username" || password != "password"){
        res.status(403).json({
            msg:"Invalid User"
        })
    }
    else{
        next()
    }
}

function calculateSum(n){
    let ans =0
    for (let i=1; i<n; i++){
        ans = ans + i;
    }
    return ans
}

const user = [
    {
        name:"John",
        kidneys:[
            {healthy:false},
            {healthy:true},
            {healthy:true}
        ]
    }
]

// base route
app.get("/",(req,res)=>{
    res.send("Congrats you are connected.")
})

// basic request with query data and response
app.get("/sum",(req,res)=>{
    // console.log("checkpoint")
    // console.log(calculateSum(5))
    let num = req.query.num
    if(!num || isNaN(num)){
        res.send("Invalid input")
    }
    let ans = calculateSum(num)
    res.send(ans.toString()) 
})

// response with status code
app.get("/age",(req,res)=>{
    res.status(201).send("<h1>This is an H1 tag.</h1>")
})

// sending json using res.json
app.get("/sendJson",(req,res)=>{
    res.json({
        name:"Anil Kapoor",
        requestCount: requests
    })
})

// request is sending headers
app.post("/sendingHeaders",(req,res)=>{
    // console.log(req.headers["header1"])
    // console.log(req.body)
    res.send("Received")
})

// sending a kidney via query param not param
app.post("/sendingKidney",(req,res)=>{
    let kidney = req.query.kidney
    // console.log("req params",req.params)
    // console.log("kidney received as ",kidney)
    user[0].kidneys.push({
        healthy: kidney
    })
    res.send("Kidney Added")
})

// sending data as param
app.get("/user/:name",(req,res)=>{
    let nameObj = req.params.name
    // console.log("nameObj ", nameObj)
    // console.log("name received as param is ", nameObj)
    res.send("received")
})

// responding all kidneys in DB
app.get("/listKidneys",(req,res)=>{
    let kidneys = user[0].kidneys.length
    let healthyKidneys = 0
    for(let i =0;i<kidneys;i++){
        if(user[0].kidneys[i].healthy)
            healthyKidneys++;
    }
    let unhealthyKidneys = kidneys - healthyKidneys
    res.json({
        kidneys,
        healthyKidneys,
        unhealthyKidneys
    })
})

// delete all the unhealthy kidneys
app.delete("/unhealthyKidney", (req,res)=>{
    if(user[0].kidneys.some(kidney=>kidney.healthy==false)){
        const newKidneys = []
        for (let i = 0; i<user[0].kidneys.length; i++){
            if(user[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy:true
                })
            }
        }
        
        user[0].kidneys=newKidneys
        // console.log("user ",user[0].kidneys);
        res.json({
            msg: "Success"
        })
    }
    else{
        res.status(411).json({
            msg:"No unhealthy kidneys present!"
        })
    }
})

// read the content of the specified file
app.get("/readFile/:fileName",(req,res)=>{
    const fileName = req.params.fileName
    // console.log(fileName);
    // console.log(fs.existsSync(fileName));
    if (fs.existsSync(fileName)){
            fs.readFile(fileName,"utf8",(err,data)=>{
                if(err){
                    res.json({
                        msg:"error while reading file."
                    })
                }
                res.json({
                    data
                })
            })
    }
    res.status(411).json({
        msg:"No file found"
    })
})

// read the names of all the files in the specified directory
app.get("/readFileNames/:dirName",(req,res)=>{
    const dirName = req.params.dirName
    // console.log(dirName);
    fs.readdir(dirName,(err,data)=>{
        if(err){
            res.status(400).json({
                msg:"Error while reading file names."
            })
        }
        res.status(200).json({
            data
        })
    })
})


// api endpoint that uses the above middleware
app.get("/greetMe", (req,res)=>{
    res.json({
        msg:"Hello, Have a nice day."
    })
})

// using zod validation
app.post("/health-checkup",(req,res)=>{
    const kidneys = req.body.kidney
    const result = schema.safeParse(kidneys)
    if(!result.success){
        res.json({
            msg:"Invalid Input"
        })
    }
    else{
        res.json({
            result
        })
    }
})

// zod validation object
app.get("/validate-object",(req,res)=>{
    const object = req.body
    const result = validateObject(object)
    if(result.success){
        res.json({
            msg:"Success",
            response:result
        })
    }
    else{
        res.json({
            msg:"Failed",
            response:result
        })
    }
})

// global catch[
app.use((err,req,res,next)=>{
    res.json({
        msg: "Oops something went wrong."
    })
})

app.listen(port,()=>{
    console.log("server is running on port ", port)
})