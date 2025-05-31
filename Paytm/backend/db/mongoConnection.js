const { default: mongoose } = require("mongoose")

let mongoInstance = ""
const mongoConn = async ()=>{
    if (mongoInstance == ""){
        console.log("New Connection");
        try{
            mongoInstance = await mongoose.connect(process.env.DB_URL)
            console.log("Connected to Database");
            return mongoInstance

        } catch(e){
            console.log("Error connecting to the database, ",e);
        }
    } else {
        console.log("Returning Existing Connection");
        return mongoInstance
    }

}
module.exports = mongoConn