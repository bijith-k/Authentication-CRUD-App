const users = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const signIn = async(req,res) => {
  try {
    const {email,password} = req.body
    const userData = await users.findOne({email})
    if(userData){
      const auth = await bcrypt.compare(password,userData.password)
      if(auth){
        const userId = userData._id
        const token = jwt.sign({userId},process.env.SECRET,{expiresIn:40000})
        res.json({success:true,token,userData,message:"User successfully verified"})
      }else{
        res.json({ success: false, message: "Password is incorrect" })
      }
    }else{
      res.json({ success: false, message:"No user found" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const signUp = async(req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body

    let userData = await users.findOne({ email })

    if (!userData) {
      console.log("first")
      const user = await users.create({
        name,
        email,
        password
      })

      res.json({ success: true, message: "User created successfully" })
    } else {
      res.json({ success: false, message: "User with same email already presents" })
    }
  } catch (error) {
    console.log(error,"d")
    res.status(400).json({success:false,message:error.message})
  }
}

module.exports = {
  signIn,
  signUp
}