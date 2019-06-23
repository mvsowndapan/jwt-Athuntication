const mongoose = require('mongoose'),
    userSchema = mongoose.Schema({
        name: { type: String, required: true },
        password: { type: String, required: true }
    }),
    userModel = mongoose.model('User', userSchema);

module.exports = userModel;