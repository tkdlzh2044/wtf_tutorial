var User = require('../model/user');

exports.list = function(req, res){

    User.find( function(err, users){

        if(err) throw err;

        for (var key in users){

            var user = users[key];
            console.log(user.get('id') + "  @@1");
        }

        res.render( path["admin"] + 'views/index', {
            title: "MY HOMEPAGE",
            users : users
        });
    });
}; // end list

exports.regUser = function(req, res){

    console.log(req.body.userId);
    console.log(req.body.pw);

    var user = new User({
        id: req.body.userId,
        pw: req.body.pw
    });

    user.save(function(err, user){
        if(err) return console.error(err);
        console.dir(user);
    });

    res.redirect('/admin');
    res.end();
}; // end regUser

exports.update = function(req, res){

    res.redirect('/');
    res.end();
}; // end update

exports.remove = function(req, res){
    User.remove({id: req.body.id}, function(err){
        if (err) throw err;

        console.log("delete user : " + req.body.id);
    });

    res.redirect('/');
    res.end();
}; // end remove
