const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now()
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: true,
  }
})

module.exports = mongoose.model('notes',noteSchema)