const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "mateus123",
    database: 'ControladorDeNotas',
})

module.exports = connection