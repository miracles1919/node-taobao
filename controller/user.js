import mongoose from 'mongoose'
import { UserModal, UserInfoModal } from '../models/user'
import { addListener } from 'cluster';

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

const getUserInfo = async (req, res) => {
  let { params } = req
  try {
    await mongoose.connect(mongoUrl)
    let { addressList = [] } = await UserInfoModal.findOne(params) || {}
    res.send({ success: true, addressList })
  } catch (err) {
    res.send({ success: false, error: err })
  }
}

const setUserInfo = async (req, res) => {
  let params = req.body
  let { uid } = params
  delete params.uid
  try {
    await mongoose.connect(mongoUrl)
    let docs = await UserInfoModal.update({ uid }, params, { upsert:true })
    res.send({ success: true })

  } catch (err) {
    res.send({ success: false, error: err })
  }
}

const addAddress = async (req, res) => {
  let { uid, name, phone, location, address } = req.body
  try {
    await mongoose.connect(mongoUrl)
    let doc = await UserInfoModal.findOne({ uid })
    let { addressList = [] } = doc || {}
    addressList = addressList.map(({ name, phone, location, address }) => {
      return { name, phone, location, address }
    })
    addressList.push({ name, phone, location, address })
    await UserInfoModal.update({ uid }, { addressList }, { upsert: true })
    res.send({ success: true, message: '添加成功' })
  } catch (err) {
    res.send({ success: false, error: err })
  }
}

const delAddress = async (req, res) => {
  let { uid, index } = req.body
  try {
    await mongoose.connect(mongoUrl)
    let { addressList } = await UserInfoModal.findOne({ uid })
    addressList = addressList.map(({ name, phone, location, address }) => {
      return { name, phone, location, address }
    })
    addressList.splice(index, 1)
    await UserInfoModal.update({ uid }, { addressList }, { upsert: true })
    res.send({ success: true, message: '删除成功' })
  } catch (err) {
    res.send({ success: false, error: err })
  }
}


module.exports = {
    login,
    register,
    getUserInfo,
    setUserInfo,
    addAddress,
    delAddress
}
