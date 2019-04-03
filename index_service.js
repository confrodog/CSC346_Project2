//var http = require('http');
(function () {
    "use strict";
var fs = require('fs');
var mysql = require('mysql');
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

  //fileContent = file_to_line(file_name);
  	var user = req.query.user;

	console.log(user);
})

app.listen(3000);
})();

