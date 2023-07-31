const { addNote, getNotes, editNote, deleteNote } = require('../controller/notesController');
const { signIn, userAuth } = require('../controller/userController');
const { signUp } = require('../controller/userController');
const { forgotPassword } = require('../controller/userController');
const { resetPassword } = require('../controller/userController');
const { verifyUser } = require('../middleware/verifyUser')
const router = require('express').Router()


router.get('/user-auth',verifyUser,userAuth)
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/add-note', verifyUser, addNote);
router.get('/get-notes', verifyUser, getNotes);
router.delete('/delete-note/:id', verifyUser, deleteNote);
router.put('/edit-note/:id', verifyUser, editNote);


module.exports = router;