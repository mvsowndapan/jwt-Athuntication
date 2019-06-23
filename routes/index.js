const express = require('express'),
    router = express.Router();


const userRouter = require('./userRouter');

router.use('/user', userRouter);

module.exports = router;