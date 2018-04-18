import mongoose from 'mongoose'
import UserModal from '../models/user'

const getUser = (req, res) => {
    let { account, pwd } = req.body
    let error = null
    mongoose.connect('mongodb://localhost/taobao', function(err) {
        if (!err) {
            console.log('连接成功')
            UserModal.find(function(err, docs) {
                console.log(docs)
                console.log(account)
                let arr = docs.filter(item => item.account === account)
                console.log(arr)
                if (arr.length === 0) {
                    error = '账号不存在'
                } else {
                    if (arr[0].pwd !== pwd) {
                        error = '密码不正确'
                    }
                }
                
                if (error) {
                    // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                    console.log(error)
                    res.setHeader('Content-Type','text/javascript;charset=UTF-8');
                    res.send(error);
                } else {
                    res.end()
                }
                
            })
        }
    })
}

module.exports = {
    getUser
}