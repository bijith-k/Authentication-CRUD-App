const notes = require('../models/noteModel')


const addNote = async(req,res) => {
  try {
    const {title,content} = req.body
    if(!title | !content){
      res.json({ success: false, message: "Add title and contents" })
    }else{
      let noteData = await notes.findOne({title})
      if(noteData){
        res.json({ success: false, message: "Please change the title, note with same title already presents" })
      }else{
        let userId = req.user
        const note = await notes.create({
          title,content,author:userId
        })
        res.json({ success: true, message: "Note added successfully" })
      }
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  addNote
}