import mongoose from 'mongoose'
import UserModal from '../models/user'

const mongoUrl = 'mongodb://localhost/taobao'

const login = (req, res) => {
    let { account, password } = req.body
    let error = null
    mongoose.connect(mongoUrl, function(err) {
        if (!err) {
            console.log('连接成功')
            UserModal.find(function(err, docs) {
                let arr = docs.filter(item => String(item.account) === account)
                if (arr.length === 0) {
                    error = '账号不存在'
                } else if (arr[0].password !== password){
                    error = '密码不正确'
                }
                
                if (error) {
                    res.setHeader('Content-Type','text/javascript;charset=UTF-8');
                    res.send({ success: false, error});
                } else {
                    res.send({ success: true,  uid: arr[0].uid })
                }
                // res.end()
                
            })
        }
    })
}

const register = (req, res) => {
    let { account, password } = req.body
    let error = null
    mongoose.connect(mongoUrl, err => {
        if (!err) {
            UserModal.find((err, docs) => {
                let uid = docs.length + 1
                let arr = docs.filter(item => String(item.account) === account)
                if (arr.length > 0) {
                    error = '账号已经存在'
                }

                if (!error) {
                    let user = new UserModal({ uid, account: Number(account), password })
                    user.save((err, docs) => {
                        if (err) {
                            error = '注册失败'
                        }
                    })
                }

                if (!error) {
                    res.send({ success: true, uid })
                } else {
                    res.send({ success: false, error })
                }
            })
        }
    })
}

module.exports = {
    login,
    register
}