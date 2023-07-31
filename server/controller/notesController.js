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

const getNotes = async(req,res) => {
  try {
    const note = await notes.find({author:req.user})
    if(note){
      res.json({ success: true, message: "Notes feteched successfully", note })
    }else{
      res.json({ success: false, message: "No notes are available" })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const deleteNote = async(req,res) =>{
  try {
    const noteId = req.params.id
    const note = await notes.findOne({_id:noteId})
    if(note){
      const noteData = await notes.deleteOne({ _id: noteId })
      res.json({ success: true, message: "Note deleted successfully" })
    }else{
      res.json({ success: false, message: "No not found to delete" })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const editNote = async (req, res) => {
  try {
    const noteId = req.params.id
    const{title,content} = req.body
    const note = await notes.updateOne({_id:noteId},{$set:{title,content,date:Date.now()}})
    res.json({ success: true, message: "Note updated successfully" })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  addNote,
  getNotes,
  deleteNote,
  editNote
}