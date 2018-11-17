var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/local';

exports.connect = function(){
    mongoose.connect(dbURI,{ useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        console.log('connected : ' + dbURI);
    });

    mongoose.connection.on('error', function(err){
        console.log('error : ' + err);
    });

    mongoose.connection.on('disconnected', function(){
        console.log('disconnected');
    });

    // 프로세스가 죽으면 다 닫기?
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
        console.log('SIGINT');
        process.exit(0);
        });
    });
}
