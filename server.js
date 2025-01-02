const express = require('express');
const path = require('path');
const fs = require('fs');
const { buildTree, findWord } = require('./bst');

const readFileLines = filename =>
    fs
        .readFileSync(filename)
        .toString('UTF8')
        .split('\n');


const app = express();
const root = buildTree(readFileLines('dictionary.txt'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/check', (req, res) => {
    const word = (req.query.word || '').trim();
    if (!word) return res.status(400).send({
        error: "You must provide a word",
    });
    const result = findWord(root, word);
    res.json(result);
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
