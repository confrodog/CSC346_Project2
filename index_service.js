//var http = require('http');
(function () {
    "use strict";
var fs = require('fs');
/*
MAKES IT APPEAR ON HTTP

var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

var port = 9000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port);
console.log("Now listening on port: " + port);
*/

const express = require("express");
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

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	var file_name = "messages.txt";

  //fileContent = file_to_line(file_name);
  var jsonObj = "json_object_test";

  res.send(JSON.stringify(jsonObj));
	if(file_name == "") {
		res.status(410);
		res.send("File was not found");
	}

})

app.listen(3000);
})();

