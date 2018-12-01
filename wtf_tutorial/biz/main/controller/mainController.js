var path = require('path');

exports.list = (req, res) => {
    res.render( path.join(__rootPath, 'biz', 'main', 'views', 'index'), {
        title: "MY HOMEPAGE",
        length: 5
    });
}; // end list

exports.create = (req, res) => {

  res.redirect('/');
  res.end();
}; // end create

exports.update = (req, res) =>{

  res.redirect('/');
  res.end();
}; // end remove
