const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    userList: [{
        id: String,
        fullName: String,
        title: String,
        url: String,
        latLong: String,
    }],
    openList: [{
        id: String,
        fullName: String,
        title: String,
        url: String,
        latLong: String,
    }],
})

module.exports = mongoose.model('User', UserSchema)

// id: req.body.park.id,
// fullName: req.body.park.fullName,
// title: req.body.park.title,
// url: req.body.park.url,
// latLong: req.body.park.latLong