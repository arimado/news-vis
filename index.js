var express = require('express');
var app = require('express')();
var path = require('path'); //
var http = require('http').Server(app);
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    // res.send('hello');
});

http.listen(process.env.PORT || 3000, function () {
    console.log('listening on 3000');
});
