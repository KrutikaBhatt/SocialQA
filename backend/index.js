const express = require('express')
const db = require('./config/mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(cors());
app.use(bodyParser.json({limit :"30mb", extended :true}));
app.use(bodyParser.urlencoded({limit :"30mb", extended :true}));
app.use('/', require('./routes'))

app.listen(port, (err) => {
    if(err) console.log(err)
    else console.log("Express server is up and running on port:", port) 
})