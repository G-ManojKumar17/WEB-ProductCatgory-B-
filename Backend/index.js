const express = require('express')
const mysql = require('mysql2')
const db = require('./Database/db')
const route = require('./routes/route')
const cors = require('cors')
const app = express()
const port = 3100

app.use(cors({
    origin: 'https://web-productcatgory-f.onrender.com',  // Allow only your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))


// Serve Angular static files

app.use('/api', route); // Keep API routes separate

// Handle Angular routes (serve index.html for frontend paths)


app.listen(port, ()=>{
    console.log('3100 is listening')
})

