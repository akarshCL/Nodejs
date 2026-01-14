
const mongoose =require("mongoose");

const connectDb=async()=>{
try{

    console.log(process.env.MONGOURL,"oooo")
   await mongoose.connect(process.env.MONGOURL)
   console.log("db is connected successfully")

}catch(err){
console.log("error while making connection",err)
}
}

module.exports=connectDb;