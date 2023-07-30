const { addNote } = require('../controller/notesController');
const { signIn } = require('../controller/userController');
const { signUp } = require('../controller/userController');
const { forgotPassword } = require('../controller/userController');
const { resetPassword } = require('../controller/userController');
const { verifyUser } = require('../middleware/verifyUser')
const router = require('express').Router()



router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/add-note',verifyUser, addNote);


module.exports = router;