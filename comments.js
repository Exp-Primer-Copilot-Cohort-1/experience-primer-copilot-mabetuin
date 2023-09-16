// Create web server
// Run: node comments.js
// Test: curl -X POST -H "Content-Type: application/json" -d '{"body": "This is a comment"}' http://localhost:3000/comments
// Test: curl -X GET http://localhost:3000/comments
// Test: curl -X GET http://localhost:3000/comments/1
// Test: curl -X PUT -H "Content-Type: application/json" -d '{"body": "This is a new comment"}' http://localhost:3000/comments/1
// Test: curl -X DELETE http://localhost:3000/comments/1

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Create an in memory database
var comments = [
	{
		"id": 1,
		"body": "This is a comment"
	}
];

// Set up body parser to parse json
app.use(bodyParser.json());

// Get all comments
app.get('/comments', function(req, res) {
	res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', function(req, res) {
	var commentId = parseInt(req.params.id);
	var comment = comments.find(function(comment) {
		return comment.id === commentId;
	});
	if (comment) {
		res.json(comment);
	} else {
		res.status(404).send();
	}
});

// Create a comment
app.post('/comments', function(req, res) {
	var comment = req.body;
	comment.id = comments.length + 1;
	comments.push(comment);
	res.json(comment);
});

// Update a comment
app.put('/comments/:id', function(req, res) {
	var commentId = parseInt(req.params.id);
	var comment = comments.find(function(comment) {
		return comment.id === commentId;
	});
	if (comment) {
		comment.body = req.body.body;
		res.json(comment);
	} else {
		res.status(404).send();
	}
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
	var commentId = parseInt(req.params.id);
	var commentIndex = comments.findIndex(function(comment) {
		return comment.id === commentId;
	});
	if (commentIndex > -1) {
		comments.splice(commentIndex, 1);
		res.status(204).send();
	} else {
		res.status(404).send