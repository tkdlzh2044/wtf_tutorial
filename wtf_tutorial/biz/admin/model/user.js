var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String,
        allowNull: false,
        primaryKey: true
    },
    pw: {
        type: String,
        allowNull: false
    },
    creatDate:{
        type: Date,
        allowNull: false,
        default: new Date()
    }
});

module.exports = mongoose.model('user', userSchema);