import mongoose from 'mongoose'
import CartModel from '../models/cart'
import { mongoUrl } from '../config'

const addCart = (req, res) => {
    let { uid, shopid, gid, select, account } = req.body
    let error = null
    let params = { uid, shopid, gid, select, account }
    mongoose.connect(mongoUrl, err => {
        if (!err) {
            CartModel.find({ uid, shopid, gid, select }, (err, docs) => {
                if (docs.length === 0) {
                    CartModel.create(params, (err, doc) => {
                        if (!err) {
                            res.send({ success: true })
                        }
                    })
                } else {
                    let newAccount = docs[0].account + account
                    CartModel.update({ uid, shopid, gid, select }, { account: newAccount }, (err, raw) => {
                        if (!err) {
                            res.send({ success: true })
                        }
                    })
                }
            })
        }
    })
}

const cartList = (req, res) => {
    let { uid } = req.body
}

module.exports = {
    addCart
}