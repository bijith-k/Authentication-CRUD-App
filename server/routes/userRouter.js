const { signIn } = require('../controller/userController');

const router = require('express').Router()



router.post('/signIn',signIn);


module.exports = router;