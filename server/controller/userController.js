

const signIn = (req,res) => {
  console.log(req.body)
  res.send({status:true})
}

module.exports = {
  signIn
}