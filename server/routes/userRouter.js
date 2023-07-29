const { signIn } = require('../controller/userController');
const { signUp } = require('../controller/userController');
const { forgotPassword } = require('../controller/userController');
const { resetPassword } = require('../controller/userController');

const router = require('express').Router()



router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


module.exports = router;