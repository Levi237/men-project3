const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userList: [{
        id: String,
        name: String
    }]
})

module.exports = mongoose.model('User', UserSchema)