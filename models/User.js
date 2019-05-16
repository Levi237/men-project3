const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userList: [{
        id: String,
        fullName: String,
        name: String,
        url: String,
    }]
})

module.exports = mongoose.model('User', UserSchema)