(function () {
    "use strict";
const express = require("express");
const mysql = require('mysql');
const app = express();
app.use(express.static('public'));

const DBinfo = require("./public/connection");
const upload = require("./services/file-upload");
const singleUpload = upload.single('avatar');

// allows us to access prAameters easily
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
console.log('web service started');

// so that we can run on the localhost without errors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.post('/', jsonParser, function (req, res) {

    var jsonObj = req.body;
	var username = jsonObj.username;
	var password = jsonObj.password;
	var screen_name = jsonObj.screen_name;

	var conn = mysql.createConnection({
		host: DBinfo.host, //address of RDS
		database: DBinfo.database,
		user: DBinfo.user,
		password: DBinfo.password,
		debug: "true"
	});

	var query = "INSERT INTO accounts (username, password, screen_name, money) VALUES ('" 
				+ username + "', '" + password + "', '" + screen_name + "', 500);";
	// var query = "INSERT INTO accounts (username, password, screen_name, money)"
	// 			+ " SELECT * FROM (SELECT '" + username + "', '" + password + "', "
	// 			+ "'" + screen_name + "', 500) AS tmp"
	// 			+ " WHERE NOT EXISTS ("
	// 				+ "SELECT username FROM accounts WHERE username = '" + username +"'"
	// 			+ ") LIMIT 1;"

	conn.connect(function(err){
		if (err) throw err;
		conn.query(query, function(err, result){
			if (err) {
				res.status(400);
				res.send(err);
			}
			console.log("successfully added " + username);
			res.send({"username": username, "password": password, "screen_name": screen_name, "money": 500});
		})
	})


})

//for updating money
app.post('/update', jsonParser, function(req,res) {
	
	console.log("entered update on server");
	var jsonObj = req.body;
	var user = jsonObj.username;
	var money = jsonObj.money;
	var conn = mysql.createConnection({
		host: DBinfo.host, //address of RDS
		database: DBinfo.database,
		user: DBinfo.user,
		password: DBinfo.password,
		debug: "true"
	});

	var query = "UPDATE accounts SET money = '" + money + "' WHERE username = '" + user + "'";

	conn.connect(function(err){
		if(err) throw err;
		console.log("connected!");
		conn.query(query, function (err, result, fields) {
			if (err) {
				res.status(400);
				res.send(err);
			}
			console.log(result.affectedRows + " record(s) updated");
		});
	})
})

app.post('/image-upload', singleUpload,function(req, res) {
	console.log(req.file);
	return res.json({'imageUrl': req.file.location});
	// singleUpload(req, res, function(err, some) {
	//   if (err) {
	// 	return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
	//   }
	//   console.log(req.file); 
	//   return res.json({'imageUrl': req.file.location});
	// });
  })

app.get('/signin', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	
	var user = req.query.user;
	var pass = req.query.pass;
	
	var query = "SELECT * FROM accounts WHERE username = '" + user + "' AND password = '" + pass + "'";

	var conn = mysql.createConnection({
		host: DBinfo.host, //address of RDS
		database: DBinfo.database,
		user: DBinfo.user,
		password: DBinfo.password,
		debug: "true"
	});

	conn.connect(function (err){
		if(err) throw err;
		console.log("connected!");
		conn.query(query, function (err, result, fields) {
			if (err) {
				res.status(400);
				res.send(err);
			}
			res.send(result);
		});
	})

})

app.get('/winners', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");

	var conn = mysql.createConnection({
		host: DBinfo.host, //address of RDS
		database: DBinfo.database,
		user: DBinfo.user,
		password: DBinfo.password,
		debug: "true"
	});

	var query = "SELECT username, money FROM accounts ORDER BY money DESC LIMIT 10";

	conn.connect(function (err){
		if(err) throw err;
		console.log("connected!");
		conn.query(query, function (err, result, fields) {
			if (err) {
				res.status(400);
				res.send(err);
			}
			console.log(JSON.stringify(result));
			res.send(JSON.stringify(result));
		});
	})

})

app.listen(3000);
})();