var http = require('http');
var fs = require('fs');
var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.logger("short"));

var port = 9000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port);
