// Importing packages
const express = require('express');
const path = require('path');

const hostname = "localhost";
const port = 8080;

// Initializing express.js
const app = express();

// Home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port);