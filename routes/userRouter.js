const express = require('express'),
    bcryptjs = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    userRouter = express.Router();

// files required
const User = require('../models/user'),
    key = require('../config/keys');
// @route	post /register
// @desc    Registering the user
// @access	Public
userRouter.post('/register', async (req, res) => {
    try {
        let { name, password } = req.body,
            user = await User.findOne({ name: name });
        if (user) res.status(400).json({ result: "User already exists" });
        let salt = await bcryptjs.genSalt(10),
            hash = await bcryptjs.hash(password, salt);
        password = hash;
        let newUser = await User.create({ name, password });
        res.status(400).json(newUser);
    }
    catch (e) { res.json(e); }
});

// @route	Post /login
// @desc	login the user
// @access	Public
userRouter.post('/login', async (req, res) => {
    try {
        let { name, password } = req.body;
        let user = await User.findOne({ name: name });
        if (!user) res.status(404).json("User Does not Exists");
        let isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) res.status(404).json({ result: "Password does not match " });
        let token = await jwt.sign({ id: user.id, name: user.name, password: user.password }, key.secretKey);
        res.json({ success: true, token: "Bearer " + token });
    }
    catch (e) { res.json(e); }
});

// @route	Get /user
// @desc	get the user details
// @access	Private
userRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
})

module.exports = userRouter;