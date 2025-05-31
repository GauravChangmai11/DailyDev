const mongoose = require("mongoose")

const generateRandomNumber = () => {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
  };

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required:true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    amount:{
        default: generateRandomNumber,
        type: Number
    }},
    {timestamps:true}
)


const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel