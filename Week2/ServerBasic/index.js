const express = require("express")
const fs = require("fs")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

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
            {healthy:true}
        ]
    }
]

// base route
app.get("/",(req,res)=>{
    res.send("hello world")
})

// basic request with query data and response
app.get("/sum",(req,res)=>{
    console.log("checkpoint")
    console.log(calculateSum(5))
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
        age: 22
    })
})

// request is sending headers
app.post("/sendingHeaders",(req,res)=>{
    console.log(req.headers["header1"])
    console.log(req.body)
    res.send("Received")
})

// sending a kidney via query param not param
app.post("/sendingKidney",(req,res)=>{
    let kidney = req.query.kidney
    console.log("req params",req.params)
    console.log("kidney received as ",kidney)
    user[0].kidneys.push({
        healthy: kidney
    })
    res.send("Kidney Added")
})

// sending data as param
app.get("/user/:name",(req,res)=>{
    let nameObj = req.params.name
    console.log("nameObj ", nameObj)
    console.log("name received as param is ", nameObj)
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
    if(user[0].kidneys.some(kidney=>kidney.healthy)){
        res.status(411).json({
            msg:"No unhealthy kidneys present!"
        })
    }
    const newKidneys = []
    for (let i = 0; i<user[0].kidneys.length; i++){
        if(user[0].kidneys[i].healthy){
            newKidneys.push({
                healthy:true
            })
        }
    }

    user[0].kidneys=newKidneys
    res.json({
        msg: "Success"
    })
})

// read the content of the specified file
app.get("/readFile/:fileName",(req,res)=>{
    const fileName = req.params.fileName
    console.log(fileName);
    console.log(fs.existsSync(fileName));
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
    console.log(dirName);
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

app.listen(port,()=>{
    console.log("server is running on port ", port)
})