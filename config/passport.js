const mongoose = require('mongoose'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

//model
User = require('../models/user');
//config
key = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (payload, next) => {
            try {
                let user = await User.findById(payload.id);
                if (user) return next(null, user);
                return next(null, false);
            }
            catch (e) { console.log(e) }
        })
    );
};