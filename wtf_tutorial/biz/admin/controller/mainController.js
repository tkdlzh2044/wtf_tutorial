var User = require('../model/user');
var path = require('path');
var adminViewPath = path.join(__rootPath, 'biz', 'admin', 'views');

exports.list = (req, res) => {

    User.find( (err, users) => {

        if(err) throw err;

        for (var key in users){
            var user = users[key];
            console.log(user.get('id') + "  @@1");
        }

        res.render( path.join(adminViewPath, 'index'), {
            
            title: "MY HOMEPAGE",
            users : users
        });
    });
}; // end list


exports.regUser = (req, res) => {

    console.log(req.body.userId);
    console.log(req.body.pw);

    var user = new User({
        id: req.body.userId,
        pw: req.body.pw
    });

    user.save( (err, user) => {
        if(err) return console.error(err);
        console.dir(user);
    });

    res.redirect('/admin');
    res.end();
}; // end regUser

exports.update = (req, res) => {

    res.redirect('/');
    res.end();
}; // end update

exports.remove = (req, res) => {
    User.remove({id: req.body.id}, (err) => {
        if (err) throw err;

        console.log("delete user : " + req.body.id);
    });

    res.redirect('/');
    res.end();
}; // end remove

//module.exports = adminController;
