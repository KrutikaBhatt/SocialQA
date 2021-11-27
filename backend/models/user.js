const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    bio: String,
    image: String,
    // hash: String,
    // salt: String
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)