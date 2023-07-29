const users = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");



let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,

  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let sendEmail = (name, email,token) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
        to: email,
        from: "bijithk011@outlook.com",
        subject: "Resetting password",
        html:
          "<h2>Hi " + name + ",</h2>" +
          '<h4 style="font-weight:bold;"><a href="http://localhost:5173/reset-password?token='+token+'">Click here <a/>to reset your password</h1>'
      };
      // return transporter.sendMail(mailOptions);
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject({ status: "error", error: error })
      } else {
        console.log("Email sent: " + info.response);
        resolve({ status: "success", info: info });
      }
    });
  })
};


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

const forgotPassword = async(req,res)=>{
  try {
    const {email} = req.body
    const userData = await users.findOne({ email })
    if(userData){
      const userId = userData._id
      const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: 40000 })

      const updatedData = await users.updateOne({email},{$set:{token}})
      let info = await sendEmail(userData.name,userData.email,token)
      console.log(info,"info")
      if(info.status==="success"){
        res.json({success:true,message:"Link for resetting password sent to the email id"})
      }else{
        res.json({ success: false, message: "Error while sending mail" })
      }
    }else{
      res.json({ success: false, message: "No user with the given email" })
    }

  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const resetPassword = async(req,res)=>{
  try {
    const {token,password} = req.body
    const userInfo = await users.findOne({token})
    if (!userInfo){
      res.json({ success: false, message: "Account verification failed" })
    }else{
      const saltRounds = await bcrypt.genSalt()
      const newPassword = await bcrypt.hash(password,saltRounds)
      const updatedData = await users.updateOne({token},{$set:{password:newPassword,token:""}})
      res.json({ success: true, message: "Password resetted successfully " })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  signIn,
  signUp,
  forgotPassword,
  resetPassword
}