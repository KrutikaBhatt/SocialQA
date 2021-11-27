const express = require('express')
const app = express()
const port = 8000

app.use('/', require('./routes'))

app.listen(port, (err) => {
    if(err) console.log(err)
    else console.log("Express server is up and running on port:", port) 
})