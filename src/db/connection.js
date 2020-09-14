/*const mysql = require('mysql2') // Importa o módulo do mysql

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
})

module.exports = connection */ 

// *********************************** Refeito com MongoDB por problemas particulares*****************************

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;