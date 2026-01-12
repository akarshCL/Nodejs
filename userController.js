let array = []// this our databse 
const bcrypt = require("bcrypt");
const userDetails = (req, res) => {
  res.send([
    {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
    }
  ]);
}



const fetchDetail = (req, res) => {
  res.send({
    msg: "this is fetching records"
  })
}

const userLogin = async(req, res) => {
  console.log(req.body, "login cred");
  const { email, password } = req.body;
   const uniquedata = array.find(item => item.email === email)
   if(uniquedata){
    const comparePassword= await bcrypt.compare(password,uniquedata.password);
    console.log(comparePassword,"comapare password")
    if(comparePassword){
      return res.send({
        msg:"user logged in successfully"
      })
    }else{
      return res.send({
        msg:"password is wrong"
      })
    }

   }else{
    return res.send({
      msg:"user does not exit in System"
    })
   }


}

const userSignup = async (req, res) => {
  const { email, password, name, role } = req.body;
  const uniquedata = array.find(item => item.email === email)
  console.log(uniquedata, "uniquedata")
  if (!uniquedata) {
    const hashPasssword = await bcrypt.hash(password, 10);
    console.log(hashPasssword, "hashPasssword")
    let temp = {
      email: email,
      password: hashPasssword,
      name: name,
      role: role
    }
    array.push(temp)
    return res.send({
      user: array
    })
  } else {
    return res.send({
      msg: "user already exits with this email id try login"
    })
  }




}

module.exports = { userDetails, fetchDetail, userLogin, userSignup }