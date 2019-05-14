const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    closureList: [{
        id: String,
        name: String
    }]
})

module.exports = mongoose.model('User', UserSchema)