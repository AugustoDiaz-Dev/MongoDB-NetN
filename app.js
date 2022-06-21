const express = require('express');
const PORT = 3000;
const { connectToDB, getDB } = require('./db');

// Initialize app & middleware
const app = express();

// DB Connection
let db;
connectToDB((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`App listening on port: ${PORT}`)
        });
        db = getDB();
    }
})

// Routes
app.get('/books', (req, res) => {
    let books = [];

    db.collection('books')
        .find() // Cursor --> ToArray forEach
        .sort({ author: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' });
        })
})

