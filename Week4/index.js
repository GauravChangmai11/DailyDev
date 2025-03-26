const express = require("express");
const cors = require("cors")
const app = express();
const port = 3000;
app.use(cors())

let count =0

let todos = [
  {
    title : "Gym",
    description : "Go to gym and stay healthy.",
    id : 1
  },
  {
    title : "Food",
    description : "Have healthy meals to stay healthy",
    id : 2
  }
]

app.use((req,res,next)=>{
  count+=1
  console.log("total requests made is ", count);
  next();
})

app.get("/", (req, res) => {
  res.send("Success");
});

app.get("/getSum", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  let sum = num1 + num2;
  if (sum){
    res.status(200).json({
      success: true,
      result: sum,
    });
    return;
  } else {
    res.status(400).json({
      success: false,
      result: 0
    })
  }
  });

app.get("/getTodos",(req,res)=>{
  res.status(200).json(todos)
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
