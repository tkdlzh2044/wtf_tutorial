var mainController      = require('../' + path["main" ]     + 'controller/mainController.js');
var adminController     = require('../' + path["admin" ]    + 'controller/mainController.js');

module.exports = function(app, fs)
{
    app.get('/', mainController.list);

    app.get('/admin', adminController.list);
    //app.get('/admin/:id', adminController.userDetail);
    app.post('/admin', adminController.regUser);

}