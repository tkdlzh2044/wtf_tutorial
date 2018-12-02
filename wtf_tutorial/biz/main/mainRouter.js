var path 			= require('path');
var express 		= require('express');
var router 			= express.Router();
var mainController	= require(path.join(__rootPath, 'biz', 'main', 'controller', 'mainController.js'));

var chatController	= require(path.join(__rootPath, 'biz', 'chat', 'controller', 'mainController.js'));

router.get('/', mainController.list);

router.get('/chat', chatController.index);

module.exports = router;