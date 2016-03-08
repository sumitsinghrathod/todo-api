var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();

var PORT = process.env.PORT || 3001
var todoNextId = 1;

// var todos = [{

// 		'_id':1,
// 		'name' : 'Sumit', 
// 		'completed' : false


// },{
// 	'_id' : 2,
// 	'name': 'Rathod',
// 	'completed' : false
// }]

app.use(bodyParser.json());
var todos = [];

app.get('/' , function(req , res) {

	res.send('TODO API Root');
});

app.get('/todos' , function(req , res){

	res.json(todos);
});
app.get('/todos/:id' , function(req, res) {
	var todosId = parseInt(req.params.id , 10);
	console.log(todosId);

	db.todo.findById(todosId).then(function(todo){
		if(todo)
			res.json(todo.toJSON());
		else
			res.send("data not found");
	})
	// var matchedTodos = _.findWhere(todos , todosId);
	// console.log('This is new underscore todos example' + matchedTodos);
	// // todos.forEach(function(todo){
	// // 	console.log(todo._id);
	// // 	if(todosId === todo._id)
	// // 	{
	// // 		console.log('Inside if condition');
	// // 		matchedTodos = todo;
	// // 	}

	// // });
	// if(matchedTodos)
	// 	res.json(matchedTodos);
	// else
	// 	res.status(404).send();
//	res.send(todosId);

});

app.post('/todos' , function(req , res){
var bodyData = _.pick(req.body , 'description' , 'completed');

db.todo.create(bodyData).then(function(todo) {


res.json(todo.toJSON());

}, function(e){

	res.status(400).json(e);
});
//Add ID in todos and increament it.
// 	console.log(bodyData.length);
// 	bodyData.id = todoNextId++;

// todos.push(bodyData);
// console.log(todos);
// console.log(bodyData);
// //Push data in todos

// 	res.json(bodyData);

});
console.log('Debugging server mode');
db.sequelize.sync().then(function(){
	console.log('Inside sync');
	app.listen(PORT , function(){

	console.log("Server Started on Port:::::::::" + PORT);

});


});



