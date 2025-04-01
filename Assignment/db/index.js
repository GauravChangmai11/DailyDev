const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/assignment")
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log("Error connecting to database: ", e));

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  puchasedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    maxlength: 200,
  },
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("Users", UserSchema);
const Course = mongoose.model("Courses", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
