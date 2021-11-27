const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String, 
        required: true
    },
    bio : {
        type: String,
        required: true
    },
    image: {
        type: String, 
        default: ""
    },
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)