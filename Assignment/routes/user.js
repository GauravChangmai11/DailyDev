const {Router} = require("express")
const userMiddleware = require("../middlewares/user")
const {JWT_SECRET} = require("../config")
const { User, Course } = require("../db")
const jwt = require("jsonwebtoken")
const router = Router()

router.post("/signup",async (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    await User.create({username: username,password: password})
    .then(()=>{
        res.status(200).json({msg: "User successfully created."})
    })
    .catch((e)=>{
        console.log("An error while creating user ",e);
        res.status(400).json({msg: "Failed to create user"})
    })
})

router.post("/signin",async (req,res)=>{
    let username = req.body.username
    let password = req.body.password

    let user = await User.findOne({username, password})
    if(user){
        let token = jwt.sign({username},JWT_SECRET)
        res.status(200).json({msg: "Success", token : token})
    } else {
        res.status(404).json({msg: "User not found. Check username and password"})
    }
})

router.get("/courses",async (req,res)=>{
    let courses = await Course.find({})
    if(courses){
        res.status(200).json({msg:"Success",data: courses.map(item=>({title:item.title, description: item.description, price: item.price}))})
    } else {
        res.status(400).json({msg: "Failed!",data:[]})
    }
})

router.post("/applyCourse/:courseId",userMiddleware,async(req,res)=>{
    let courseId = req.params.courseId
    let course = await Course.find({_id:courseId})
    let username = req.user
    if(course){
        await User.updateOne(
            {
                username: username
            },
            {
                "$push" : {puchasedCourses: courseId}
            }
        )
        res.status(200).json({msg: "Purchase Completed."})
    } else {
        res.status(400).json({msg: "No course found!"})
    }
})

router.get("/purchasedCourses",userMiddleware,async(req,res)=>{
    let username = req.user
    let user = await User.findOne({username})
    let userCourses = user.puchasedCourses
    if(userCourses){
        let courses = await Course.find({_id:{"$in":userCourses}})
        res.status(200).json({msg: "Success",data:courses.map(item=>({title:item.title, description:item.description}))})
    } else {
        res.status(400).json({msg:"Failed. No purchased course found"})
    }

})

module.exports = router