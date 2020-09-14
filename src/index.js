require("dotenv").config(); // Configura as variáveis de ambiente

//Importapacotes para o servidor
const express = require('express');
const cors = require('cors');

const conection = require('./db/connection');

//Importa as rotas
const routes = require('./routes');

const app = express();

//Configura o cors para aceitar requisições de qualquer lugar
app.use(cors());
//Diz para o servidor entender requisições que tragam dados no formato JSON
app.use(express.json());
//Configura as rotas do servidor
app.use(routes);

//Procura o numero da porta nas variáveis de ambiente
const port = process.env.PORT || 3333;
//Diz para o servidor ouvir a porta da variável port
app.listen(port, _ => {
    console.log('[INDEX] Server running at port ' + port) 
});