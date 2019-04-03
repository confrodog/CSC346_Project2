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

// reads data asynchronously fromt he passed in file name
// returns the contents of the file as a string
function read_file(file_name) {
	var file= 0;
	try {
	    file = fs.readFileSync(file_name, 'utf8');
	} catch(e) {
	    console.log('Error:', e.stack);
	}
	return file;
}
// allows us to access prAameters easily
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
console.log('web service started');

app.post('/', jsonParser, function (req, res) {

    var jsonObj = req.body;
    console.log(jsonObj);

    res.send("username recieved");

})

app.get('/signin', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	
	var user = req.query.user;
	var pass = req.query.pass;
	console.log(user);
	console.log(pass);
	
	var query = "SELECT * FROM accounts WHERE username = " + user + " AND password = " + pass + ";";

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