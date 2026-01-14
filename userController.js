let array = [{
  "email": "akarssdfh@gmail.com",
  "password": "$2b$10$akILgZCX5fwT8OlZe72OgubTbl1/0pp.F5AIWji2M1Ksm1MSxU57C",
  "name": "Akarsh Gupta",
  "role": "Admin",
  "id": 1
}]// this our databse 


const user = require("./userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// console.log(jwt, "jwt logger")
const SECRETKEY = "EveningBatch"


const searchParameter = (req, res) => {

  return res.send(req.query)

}

const singleUserDetail = (req, res) => {
  const { id } = req.params;
  console.log(id, "id ")
  const result = array.find(item => item.id == id)
  if (result) {
    return res.send(result)
  }
  else {
    return res.send({ msg: "user not found" })
  }

}


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
  const tokenKey = req.headers?.authorization?.split(" ")[1]
  console.log(tokenKey, "hh")
  if (tokenKey) {

    const validate = jwt.verify(tokenKey, SECRETKEY)
    if (validate) {
      res.send({
        msg: "this is fetching records",
        tokenKeys: tokenKey
      })
    } else {
      return res.send({ msg: "user is not authorised" })
    }

  } else {
    return res.send({ msg: "you r not permitted" })
  }

}

const userLogin = async (req, res) => {
  console.log(req.body, "login cred");
  const { email, password } = req.body;
  const uniquedata = await user.find({ email: email })
  if (uniquedata) {
    const comparePassword = await bcrypt.compare(password, uniquedata.password);
    console.log(comparePassword, "comapare password")
    if (comparePassword) {
      let user = {
        email: uniquedata.email,
        name: uniquedata.name,
        role: uniquedata.role
      }
      const token = jwt.sign(user, SECRETKEY);
      return res.send({
        msg: "user logged in successfully",
        Token: token
      })
    } else {
      return res.send({
        msg: "password is wrong"
      })
    }
  } else {
    return res.send({
      msg: "user does not exit in System"
    })
  }
}

const userSignup = async (req, res) => {
  const { email, password, name, role } = req.body;
  const uniquedata = await user.find({ email: email })
  if (uniquedata) {
    const hashPasssword = await bcrypt.hash(password, 10);
    let temp = {
      ...req.body,
      password: hashPasssword
    }
    // array.push(temp) /// once the data or user info is saved in DB after that wee are generating the JWT key >> JSONWEBTOKEN >>>by using its library;
    const data = await user.create(temp)
 
    let users = {
      email, name, role
    }
    const token = jwt.sign(users, SECRETKEY);

    return res.send({
      user: data,
      Token: token
    })
  } else {
    return res.send({
      msg: "user already exits with this email id try login"
    })
  }




}

module.exports = { searchParameter, userDetails, fetchDetail, userLogin, userSignup, singleUserDetail }