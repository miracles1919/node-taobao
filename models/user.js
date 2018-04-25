const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    uid: Number,
    account: Number,
    password: String,
})

const userInfoSchema = Schema({
    uid: Number,
    name: String,
    addressList: [{
      name: String,
      phone: Number,
      location: String,
      address: String,
    }]
})

export const UserModal = mongoose.model('user', userSchema, 'user')
export const UserInfoModal = mongoose.model('userinfo', userInfoSchema, 'userinfo')
