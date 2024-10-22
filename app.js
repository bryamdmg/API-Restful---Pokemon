const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(express.json());

const mongoDBURI = 'mongodb://localhost:27017/pokemonDB';
mongoose.connect(mongoDBURI, {})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


app.use('/api/pokemons', require('./routes/pokemons'));
app.use('/api/auth', require('./routes/auth'));

app.listen(3033, () => {
    console.log('Servidor ejecutándose en http://localhost:3033');
});