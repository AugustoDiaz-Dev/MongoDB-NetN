const express = require('express');
const { ObjectId } = require('mongodb');
const PORT = 3000;
const { connectToDB, getDB } = require('./db');

// Initialize app & middleware
const app = express();
app.use(express.json());

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

app.get('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('books')
            .findOne({ _id: ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the documents' })
            })

    } else {
        res.status(500).json({ error: 'Not valid document id' })
    }

})

app.post('/books', (req, res) => {
    const book = req.body;

    db.collection('books')
        .insertOne(book)
    then(result => {
        res.status(201).json(result)
    })
        .catch(err => {
            res.status(500).json({ error: 'Could not create a new document' });
        })
})

app.delete('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete the document' })
            })

    } else {
        res.status(500).json({ error: 'Not valid document id' })
    }
})