const express = require('express');
const PORT = 3000;

// Initialize app & middleware
const app = express();

// Routes
app.get('/books', (req, res) => {
    res.json({ mssg: "Welcome to the API" })
})

app.listen(PORT, () => {
    console.log("App listening on port: ${PORT}")
});