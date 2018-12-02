var path = require('path');
var User = require(path.join(__rootPath, 'biz', 'admin', 'model', 'user'));
var adminViewPath = path.join(__rootPath, 'biz', 'admin', 'views');

exports.list = (req, res) => {

    User.find( (err, users) => {//user select
        if(err) throw err;

        res.render( path.join(adminViewPath, 'index'), {
            title: "MY HOMEPAGE",
            users : users
        });
    });
}; // end list


exports.regUser = (req, res) => {
    var newUser = new User({
        id: req.body.userId,
        pw: req.body.pw
    });

    User.find( (err, users) => {//userList select
        var isExist = false;//존재여부
        
        for (var key in users){
            var user = users[key];
            if(user.id = req.params.id ){
                isExist = true;//존재
                break;
            }
        }
        
        if(!isExist){//없으면
            newUser.save( (err, user) => {
                if(err) return console.error(err);
            });
        }    
    });
    
    res.redirect('/admin');
    res.end();
}; // end regUser


exports.ajaxTest = (req, res) => {
    User.find( (err, users) => {
        var msg = '';
        var canUse = false;
        var isExist = false;
        
        if(err) throw err;
        
        for (var key in users){
            var user = users[key];
            
            if(user.id === req.body.userId){
                msg = 'Exist!!!';
                isExist = true;
                break;
            }
        }
        
        console.log(req.body.pw + 'body pw');
        if(!isExist && req.body.pw !== ''){
            canUse = true;   
        }
        
        res.render( path.join(adminViewPath, 'ajaxTest'), {
            title: "MY HOMEPAGE",
            canUse :  canUse,
            msg : msg
        });
    });
        
    console.log('ajaxTest3');
}; // end regUser



exports.update = (req, res) => {

    res.redirect('/');
    res.end();
}; // end update

exports.delUser = (req, res) => {

    //req.params.id
    //User.remove({id: req.body.id}, (err) => {
    User.remove({id: req.params.id}, (err) => {
        if (err) throw err;

        console.log("delete user : " + req.params.id);
    });

    res.redirect('/admin');
    res.end();
}; // end remove

//module.exports = adminController;
