const { userDetails, fetchDetail, userLogin, userSignup, singleUserDetail, searchParameter } = require("./userController");

const router=require("express").Router();

// route.method("endpoint",callbackfucntion >> its ur logice which is ProgressEvent
//     in controller
// )

router.get("/userdetails",userDetails);
router.get("/fetchdetail",fetchDetail)
router.post("/login",userLogin) //
router.post("/signup",userSignup)
router.get("/singleUserDetail/:id",singleUserDetail)
router.get("/searchParameter",searchParameter)
// http://localhost:3000/api/login 
module.exports=router;