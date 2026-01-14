// const express= require("express");

// const app=express();

// https://localhost:3001/api/login or /api/home

// // https://jsonplaceholder.typicode.com/posts. which will return some information email, phone, username

// app.get("/userDetails",(req,res)=>{
// res.send({
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   })
// })
//app.get ("/userdetails",userDetails)

// app.listen(3000,()=>{
//     console.log("server is runing or not in port no 3000")
// })


const express = require('express');
const { userDetails } = require('./userController');
const router  = require('./routes');
const jwt=require("jsonwebtoken")
const app = express();
const connectDb =require("./db");
// const PORT = 3000;
require("dotenv").config();

app.use(express.json())// bodyparser


console.log(process.env.MONGOURL)
// const middleware =(req,res,next)=>{

//   const age=req.body.age;
//   if(age>=18){
//     next();
//   }else{
//     return res.send({
//       msg:"You are not allowed to vote due to less age"
//     })
//   }
// }

const authJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check token exists
  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  // Extract token (Bearer token)
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRETKEY);

    // Attach user data to request
    // req.user = decoded;

    next(); // allow route access
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

// app.use(middleware) // all routes can acces 

app.use("/api",router);  // middleware



app.get('/', authJWT,(req, res) => {
  res.send('Hello from server side!');

});  //


// app.post("/login",)

// app.get('/api/userdetails',userDetails );
// app.get("/api/fetchdetail",(req,res)=>{
//   res.send({
//     msg:"this is fetching records"
//   })
// })

app.listen(process.env.PORT, () => {

  connectDb();
  console.log(`App is running on port ${process.env.PORT}`);
});