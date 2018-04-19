var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    uid: Number,
    account: Number,
    password: String,
})

var User = mongoose.model('user', userSchema, 'user')

export default User