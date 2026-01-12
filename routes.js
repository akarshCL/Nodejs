const { userDetails, fetchDetail, userLogin, userSignup } = require("./userController");

const router=require("express").Router();

// route.method("endpoint",callbackfucntion >> its ur logice which is ProgressEvent
//     in controller
// )

router.get("/userdetails",userDetails);
router.get("/fetchdetail",fetchDetail)
router.post("/login",userLogin) //
router.post("/signup",userSignup)
// http://localhost:3000/api/login 
module.exports=router;