const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
  
let dragonball = [
    { id: 1, name: "Goku" },
    { id: 2, name: "Vegeta" },
    { id: 3, name: "Piccolo" }
];

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my first request vocab excercise. to see characters go to => /characters and to see any updated or deleted characters you did go to /characters/:id.</h1>');
});

//GET all characters
app.get('/characters',(req,res)=>{
    res.json(dragonball);
});

// GET a character by ID
app.get('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const character = dragonball.find(character => character.id === id);
    if (character) {
        res.json(character);
    } else {
        res.status(404).json({ message: 'Character not found' });
    }
});

//POST new character
app.post('/characters',(req,res)=>{
    const newCharacter = req.body;
    dragonball.push(newCharacter);
    res.status(201).json(newCharacter);
});

//PUT update character
app.put('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCharacter = req.body;
    dragonball = dragonball.map(character => {
        if (character.id === id) {
            return { ...character, ...updatedCharacter };
        }
        return character;
    });
    res.json(dragonball.find(character => character.id === id));
});

// PATCH to partially update a character
app.patch('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedFields = req.body;
    dragonball = dragonball.map(character => {
        if (character.id === id) {
            return { ...character, ...updatedFields };
        }
        return character;
    });
    res.json(dragonball.find(character => character.id === id));
});

// DELETE a character
app.delete('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    dragonball = dragonball.filter(character => character.id !== id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
