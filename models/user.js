var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    phone: Number,
    pwd: String,
})

var User = mongoose.model('user', userSchema, 'user')

// mongoose.connect('mongodb://localhost/taobao', function(err) {
//   if (!err) {
//     console.log('连接成功')
//     var user = mongoose.model('user', userSchema, 'user')
//     user.find(function(err, docs) {
//         console.log(docs)
//     })
//   }
// })

export default User