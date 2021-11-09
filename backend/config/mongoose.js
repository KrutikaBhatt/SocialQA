const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/socialqa_db')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection Error !!'))

db.once('open', () => {
    console.log('Connection Successful !!')
})