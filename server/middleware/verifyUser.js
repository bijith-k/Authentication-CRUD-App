const jwt = require("jsonwebtoken")
const users = require('../models/userModel')

module.exports.verifyUser = (req,res,next) => {
  const token = req.headers.authorization.split(" ")[1]

  jwt.verify(token,process.env.SECRET,async(err,decodedToken)=>{
    if(err){
      console.log(err)
      res.json({status:false,message:"Error in authentication"})
    }else{
      const user  = await users.findById({_id:decodedToken.userId})
      if(user){
        req.user = user._id
        next()
      }else{
        res.json({ status: false, message: "No user found" })
      }
    }
  })
}