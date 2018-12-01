var path 			= require('path');
var express 		= require('express');
var router 			= express.Router();

var adminController	= require(path.join(__rootPath, 'biz', 'admin', 'controller', 'mainController.js'));

router.get('/', adminController.list);
//app.get('/admin/:id', adminController.userDetail);
router.post('/', adminController.regUser);

module.exports = router;