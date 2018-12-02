var path 			= require('path');
var express 		= require('express');
var router 			= express.Router();

var chatController	= require(path.join(__rootPath, 'biz', 'chat', 'controller', 'mainController.js'));

router.get('/', chatController.index);

router.get('/enter', chatController.enter);

router.post('/enter', chatController.postEndter);

router.post('/makeroom', chatController.makeroom);

module.exports = router;