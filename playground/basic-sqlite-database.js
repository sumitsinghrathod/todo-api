
//console.log('This database path>>>>>>>>>>>>>>>>>>>>>>>>'+ Sequelize.storage);
var Todo = sequelize.define('todo' , {
	description :{
		type : Sequelize.STRING,
		allowNull : false,
		validate:{
			isEmail : true
		}
	},
	completed : {
		type : Sequelize.BOOLEAN
	}


});

sequelize.sync().then(function(){
	console.log('Everything is synced');
	
	Todo.create({
		description : 'sumitkumar@gmail.com',
		completed : false
	}).then(function(todo){
		console.log('Finished!');
		console.log(todo);
	Todo.findById(1).then(function(todo){
		if(todo)
			console.log('Fetched data from todo>>>>>>>>>>>>>>>>>>' + todo.toJSON().id);
			console.log('Fetched data from todo and description is>>>>>>>>>>>>>>>>>>' + todo.toJSON().description);

	});
	});

	

});