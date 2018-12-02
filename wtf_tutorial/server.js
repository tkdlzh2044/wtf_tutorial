var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var session     = require('express-session');
var fs          = require("fs");
var mongoose    = require('mongoose');
var path        = require('path');
//pass-port 추가예정

app.set('views'			, __dirname);
app.set('view engine'	, 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public')	);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(bodyParser.json()			);
app.use(bodyParser.urlencoded()		);
app.use(
	session({
		secret: '@#@$MYSIGN#@$#$',
 		resave: false,
 		saveUninitialized: true
	})
);

//rootPath 설정
global.__rootPath = path.join(__dirname, '/');

// db 접속 설정
require('./db.js').connect();

// router
var mainRouter 	= require(path.join(__dirname , 'biz', 'main', 'mainRouter'));
var adminRouter = require(path.join(__dirname , 'biz', 'admin', 'adminRouter'));
var chatRouter  = require(path.join(__dirname , 'biz', 'chat', 'chatRouter'));

app.use('/' 		, mainRouter);
app.use('/admin' 	, adminRouter);
app.use('/chat' 	, chatRouter);

/// catch 404 and forward to error handler
app.use( (req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//server
var port = 8090;
var server = app.listen(port, () => {
	console.log('Express server potr = ' + server.address().port);
});

var socketServer = require(path.join(__rootPath, 'socketServer.js'));
socketServer(server);