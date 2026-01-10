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
//   },)
// })


// app.listen(3000,()=>{
//     console.log("server is runing or not in port no 3000")
// })


const express = require('express');
const { userDetails } = require('./userController');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from server side!');
});

app.get('/userdetails',userDetails );

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});