var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'todo'
});

connection.connect();

function validateKey(key){
	return new Promise((resolve, reject)=>{
		connection.query(`SELECT * FROM api_keys WHERE api_key='${key}'`, (error, results)=>{
			if(results.length == 0){
				resolve(false)
			}else{
				resolve(true)
			}
		})
	})
}


/* GET home page. */
router.get('/getStudents', function(req, res, next) {
	connection.query('SELECT * FROM students', (error, results)=>{
		if(error) throw error;
		res.json(results);
	})
});

router.get('/getTasks', function(req, res, next) {
	var check = validateKey(req.query.apiKey)
	check.then((bool)=>{
		if(bool == true){
			connection.query('SELECT * FROM tasks', (error, results)=>{
				if(error) throw error;
				res.json(results);
			})
		}else{
			res.json({msg:'no. bad key. bad.'})
		}
	})
});

router.get('/getTask/:id', function(req, res, next) {
	var check = validateKey(req.query.apiKey)
	check.then((bool)=>{
	if(bool == true){
		console.log(validateKey(req.query.apiKey))
		var taskId = req.params.id;
			connection.query(`SELECT * FROM tasks WHERE id = ${taskId}`, (error, results)=>{
				if(error) throw error;
				if(results.length == 0){
					res.json({msg:'no results'})
				}else{
					res.json(results[0]);
				}
			})
		}else{
			res.json({msg:'no. bad key. bad.'})
		}
	})
});

router.post('/delTask', (req,res)=>{
	var check = validateKey(req.query.apiKey)
	check.then((bool)=>{
		if(bool == true){
			var taskId = req.body.id;
				connection.query(`DELETE FROM tasks WHERE id = ${taskId}`,(error,results)=>{
					if(error) throw error
					res.json({msg:'deleted'})
				})
			}else{
				res.json({msg:'no. bad key. bad.'})
			}
		})
})

router.post('/addStudent', (req,res)=>{
	var toAdd = req.body;
	connection.query('INSERT INTO students (name) VALUES (?)', [toAdd], (error,results)=>{
		if(error) throw error
		connection.query('SELECT * FROM students', (error2,tacos)=>{
			if (error2) throw error2
			res.json(tacos);
		})
	})
})

router.post('/addTask', (req,res)=>{
	var check = validateKey(req.query.apiKey)
	check.then((bool)=>{
	if(bool == true){
		var toAdd = req.body.task;
			var date = req.body.date
			connection.query('INSERT INTO tasks (taskName,taskDate) VALUES (?,?)', [toAdd,date], (error,results)=>{
				console.log(results)
				if(error) throw error
				connection.query('SELECT * FROM tasks', (error2,tacos)=>{			
					if (error2) throw error2
					console.log(tacos)
					res.json(tacos);
				})
			})
		}else{
			res.json({msg:'no. bad key. bad.'})
		}
	})	
})

router.post('/editTask', (req,res)=>{
	var check = validateKey(req.query.apiKey)
	check.then((bool)=>{
	if(bool == true){
		var taskId = req.body.id;
			var newName = req.body.task;
			var newDate = req.body.date;
			connection.query(`UPDATE tasks SET taskName="${newName}", taskDate="${newDate}" WHERE id="${taskId}"`,(error,results)=>{
				console.log(results)
				connection.query(`SELECT * FROM tasks WHERE id="${taskId}"`, (err,ressie)=>{
					console.log(ressie)
					res.json(ressie)
				})
			})
		}else{
			res.json({msg:'no. bad key. bad.'})
		}
	})
})



module.exports = router;
