exports.list = function(req, res){
  
    res.render( path["main"] + 'views/index', {
        title: "MY HOMEPAGE",
        length: 5
    });
     

  //}); 
}; // end list

exports.create = function(req, res){

  res.redirect('/');
  res.end();
}; // end create

exports.update = function(req, res){

  res.redirect('/');
  res.end();
}; // end remove
