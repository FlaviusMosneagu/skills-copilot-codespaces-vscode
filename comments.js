// Create a web server
// Run: node comments.js
// Run: http://localhost:3000/
// Run: http://localhost:3000/comments
// Run: http://localhost:3000/comments/1

// Import express
const express = require('express');
// Create an express app
const app = express();
// Set port
const port = 3000;

// Import body-parser
const bodyParser = require('body-parser');
// Support parsing of application/json type post data
app.use(bodyParser.json());
// Support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Import file system
const fs = require('fs');

// Import path
const path = require('path');

// Import router
const router = express.Router();

// Import comments data
let comments = require('./comments.json');

// Import uuid
const { v4: uuidv4 } = require('uuid');

// Set view engine
app.set('view engine', 'ejs');
// Set views path
app.set('views', path.join(__dirname, 'views'));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Get home page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
  });
});

// Get comments page
app.get('/comments', (req, res) => {
  res.render('comments', {
    title: 'Comments',
    comments: comments,
  });
});

// Get add comment page
app.get('/comments/add', (req, res) => {
  res.render('add-comment', {
    title: 'Add Comment',
  });
});

// Get edit comment page
app.get('/comments/edit/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  res.render('edit-comment', {
    title: 'Edit Comment',
    comment: comment,
  });
});

// Get comment details page
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  res.render('comment-details', {
    title: 'Comment Details',
    comment: comment,
  });
});

// Create comment
app.post('/comments', (req, res) => {
  const id = uuidv4();
    const comment = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        };
    comments.push(comment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});
