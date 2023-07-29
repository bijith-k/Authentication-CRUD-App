const { signIn } = require('../controller/userController');
const { signUp } = require('../controller/userController');

const router = require('express').Router()



router.post('/signIn', signIn);
router.post('/signUp', signUp);


module.exports = router;