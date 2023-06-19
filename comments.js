// Create a web server
// Create a route to handle incoming requests
// Create a route to handle incoming POST requests
// Create a route to handle incoming DELETE requests
// Create a route to handle incoming PUT requests
// Create a route to handle incoming GET request

// Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var comments = require('../data/comments.json');
var _ = require('lodash');
var uuid = require('uuid');

// Configure body-parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

// Create a route to handle incoming requests
router.get('/', function(req, res) {
  res.json(comments);
});

// Create a route to handle incoming POST requests
router.post('/', function(req, res) {
  var comment = {
    id: uuid.v4(),
    body: req.body.body
  };

  comments.push(comment);

  fs.writeFile('./data/comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }

    res.json(comment);
  });
});

// Create a route to handle incoming DELETE requests
router.delete('/:id', function(req, res) {
  var comment = _.find(comments, {id: req.params.id});

  _.remove(comments, {id: req.params.id});

  fs.writeFile('./data/comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }

    res.json(comment);
  });
});

// Create a route to handle incoming PUT requests
router.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var comment = _.find(comments, {id: req.params.id});
  if (!comment) {
    res.send();
  }

  var updatedComment = _.assign(comment, update);

  fs.writeFile('./data/comments.json', JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }

    res.json(updatedComment);
  });
});

// Create a route to handle incoming GET request
router.get('/:id', function(req, res) {
  var comment = _.find(comments, {id: req.params.id});
  res.json(comment || {});
});

module.exports = router;