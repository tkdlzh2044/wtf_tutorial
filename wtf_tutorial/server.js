var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var session 	= require('express-session');
var fs 			= require("fs")
var mongoose    = require('mongoose');

app.set('views'			, __dirname);
app.set('view engine'	, 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public')	);

app.use(bodyParser.json()			);
app.use(bodyParser.urlencoded()		);
app.use(
	session({
		secret: '@#@$MYSIGN#@$#$',
 		resave: false,
 		saveUninitialized: true
	})
);

path = new Map();

//path["controller"]  = "controller/";
path["main" ]	= "biz/main/";
path["admin" ]	= "biz/admin/";

//server
var port = 8080;
var server = app.listen(port, function(){
	console.log('Express server potr = ' + port);
});

// db 접속 설정
require('./db.js').connect();

// router
var router = require('./router/mainRouter')(app, fs);

module.exports = app;