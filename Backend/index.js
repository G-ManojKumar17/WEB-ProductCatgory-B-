const express = require('express')
const mysql = require('mysql2')
const db = require('./Database/db')
const route = require('./routes/route')
const cors = require('cors')
const app = express()
const port = 3100

app.use(cors())
app.use(route)

app.listen(port, ()=>{
    console.log('3100 is listening')
})

