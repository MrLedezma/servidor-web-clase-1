const express = require('express');
const app = express();

let personajes = [
    { id: 1, name: "Goku" },
    { id: 2, name: "Vegeta" },
    { id: 3, name: "Piccolo" }
];

const port = 3080;

app.get('/', (req, res) => {
    res.send('Bienvenido a la lista de personajes. Visita /personajes para ver la lista completa.');
});

app.get('/personajes', (req, res) => {
    res.json(personajes);
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:3080');
});

  