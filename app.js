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
            console.log("App listening on port: ${PORT}")
        });
        db = getDB();
    }
})

// Routes
app.get('/books', (req, res) => {
    res.json({ mssg: "Welcome to the API" })
})

