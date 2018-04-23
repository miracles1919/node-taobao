import mongoose from 'mongoose'
import { mongoUrl } from '../config'
import CartModel from '../models/cart'
import { GoodModel, ShopModel } from '../models/shop'


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

const cartList = async (req, res) => {
  let { params } = req
  console.log(params)
  let goodsInfo = {} // 商品信息缓存
  let shopsInfo = {} // 店家信息缓存
  try {
    await mongoose.connect(mongoUrl)
    let docs = await CartModel.find(params)
    let cartList = []

    let promises = docs.map(item =>
      (async () => {
      let { uid, shopid, gid, select, account } = item
      // 如果缓存中不存在商品信息 去数据库取
      if (!goodsInfo[gid]) {
        goodsInfo[gid] = await GoodModel.findOne({ shopid, gid })
      }
      // 同理
      if (!shopsInfo[shopid]) {
        shopsInfo[shopid] = await ShopModel.findOne({ shopid })
      }

      let target = cartList.filter(item => item.shopid === shopid)[0]
      if (target) {
        target.itemList.push({ gid, select, num: account })
      } else {
        cartList.push({ shopid, shop: shopsInfo[shopid].name, itemList: [{ gid, select, num: account }]})
      }
    })(item))

    await Promise.all(promises)
    cartList.forEach(({ itemList }) => {
      itemList.forEach((item, index) => {
        let { imgList } = goodsInfo[item.gid]
        let { title, price } = goodsInfo[item.gid].info
        itemList[index] = Object.assign({}, item, { title, price, img: imgList[0] })
      })
    })
    res.send({ success: true, cartList })
  }catch (err){
    res.send({ success: false, error: err })
  }
}

module.exports = {
    addCart,
    cartList
}
