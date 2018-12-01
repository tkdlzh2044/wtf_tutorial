var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/local';

exports.connect = () => {
    mongoose.connect(dbURI,{ useNewUrlParser: true });

    mongoose.connection.on('connected', () => {
        console.log('connected : ' + dbURI);
    });

    mongoose.connection.on('error', (err) => {
        console.log('error : ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('disconnected');
    });

    // 프로세스가 죽으면 다 닫기?
    process.on('SIGINT', () => {
        mongoose.connection.close( () => {
        console.log('SIGINT');
        process.exit(0);
        });
    });
}
