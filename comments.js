// Create web server
// Run: node comments.js
// Test: http://localhost:3000

// Load the express module
var express = require('express');

// Create an instance of express
var app = express();

// Use the 'static' middleware to serve static files
app.use(express.static(__dirname + '/public'));

// Use the 'body-parser' middleware to parse the body
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create an array of comments
var comments = [
    { name: 'John', message: 'Hello' },
    { name: 'Mary', message: 'Hi' },
    { name: 'Sue', message: 'How are you?' }
];

// Add a route to return the array as JSON
app.get('/comments', function(req, res) {
    res.json(comments);
});

// Add a route to add a comment to the array
app.post('/comments', function(req, res) {
    comments.push(req.body);
    res.json(comments);
});

// Start the server
var port = 3000;
app.listen(port);
console.log('Listening on port ' + port);