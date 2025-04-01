const {Router} = require("express")
const adminMiddleware = require("../middlewares/admin")
const { Admin, Course } = require("../db")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config")
const router = Router()

router.post("/signup",async(req,res)=>{
    let username = req.body.username
    let password = req.body.password

    let admin = await Admin.findOne({username,password})
    if(admin){
        res.status(400).json({msg:"Admin already exists"})
    } else {
        await Admin.create({
            username,
            password
        })
        
        res.status(200).json({msg: "Admin created successfully"})
    }
})

router.post("/signin",async (req,res)=>{
    let username = req.body.username
    let password = req.body.password

    let user = await Admin.findOne({username, password})
    if(user){
        let token = jwt.sign({username: username},JWT_SECRET)
        res.status(200).json({msg: "Success", token : token})
    } else {
        res.status(404).json({msg: "User not found. Check username and password"})
    }
})

router.post("/addCourse",adminMiddleware,async (req,res)=>{
    let title = req.body.title
    let description = req.body.description
    let price = req.body.price

    const course = await Course.create({title,description,price})

    res.status(200).json({msg: "Course added successfully", courseId: course._id})
})

router.get("/courses",adminMiddleware,async(req,res)=>{
    let courses = await Course.find({})
    if(courses){
        res.status(200).json({msg: "Success",data : courses.map(item=>({title:item.title, description: item.description, price: item.price}))})
    } else {
        res.status(400).json({msg:"Failed No courses found", data:[]})
    }
})

module.exports = router