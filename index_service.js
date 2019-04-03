//var http = require('http');
(function () {
    "use strict";
const express = require("express");
var mysql = require('mysql');
const app = express();
app.use(express.static('public'));

// so that we can run on the localhost without errors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// allows us to access prAameters easily
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
console.log('web service started');

app.post('/', jsonParser, function (req, res) {

    var jsonObj = req.body;
    console.log(jsonObj);
	var username = jsonObj.username;
	var password = jsonObj.password;
	var screen_name = jsonObj.screen_name;

	var conn = mysql.createConnection({
		host: "cloud-bj-db.cgggvckznsew.us-west-1.rds.amazonaws.com", //address of RDS
		database: "cloud_blackjack",
		user: "cloud_blackjack",
		password: "iliketurtles",
		debug: "true"
	});

	var query = "INSERT INTO accounts (username, password, screen_name, money) VALUES ('" + username + "', '" + password + "', '" + screen_name + "', 500);";
	//console.log("account to be added: " + query);
	conn.connect(function(err){
		if (err) throw err;
		conn.query(query, function(err, result){
			if (err) {
				res.status(400);
				res.send(err);
			}
			console.log("successfully added " + username);
			res.send(result);
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
		host: "cloud-bj-db.cgggvckznsew.us-west-1.rds.amazonaws.com", //address of RDS
		database: "cloud_blackjack",
		user: "cloud_blackjack",
		password: "iliketurtles",
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

app.get('/signin', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	
	var user = req.query.user;
	var pass = req.query.pass;
	console.log(user);
	console.log(pass);
	
	var query = "SELECT * FROM accounts WHERE username = '" + user + "' AND password = '" + pass + "'";

	var conn = mysql.createConnection({
		host: "cloud-bj-db.cgggvckznsew.us-west-1.rds.amazonaws.com", //address of RDS
		database: "cloud_blackjack",
		user: "cloud_blackjack",
		password: "iliketurtles",
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

app.listen(3000);
})();