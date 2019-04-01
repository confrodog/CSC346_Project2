var http = require('http');
var fs = require('fs');
var express = require('express');

var app = express();
var port = 9000;

app.get('/', function(req, res){
    res.send('homepage');
});

app.listen(port);
