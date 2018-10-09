var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uriUtil = require('mongodb-uri');

var url = "mongodb://localhost:27017/";

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);

require('./app/api/userAPI.js')(app);

var mongoose = require('mongoose');
var mongooseUri = uriUtil.formatMongoose(url);
mongoose.connect(mongooseUri);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:')); //check errors

console.log("Server start running at port", port);