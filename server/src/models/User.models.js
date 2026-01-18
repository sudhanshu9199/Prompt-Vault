const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    password: String,
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;