require("dotenv").config()

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, _ => {
    console.log('[INDEX] Server running at port 3333') 
});