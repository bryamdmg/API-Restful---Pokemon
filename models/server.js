const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use('/api/pokemons', require('../routes/pokemons'));
        this.app.use('/api/auth', require('./routes/auth'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor escuchando en puerto ${this.port}`);
        })
    }
}

module.exports = Server;