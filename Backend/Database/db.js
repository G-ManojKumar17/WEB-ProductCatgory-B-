const sql = require('mysql2')

const connection = sql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12765018',
    password: 'AheIwEzrtu',
    database: 'sql12765018',
})

connection.connect((err)=>{
    if(err){
        console.log("SQL DB connection error:", err);
    }else{
        console.log("SQL DB connected")
    }
})

module.exports = connection;