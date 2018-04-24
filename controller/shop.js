import mongoose from 'mongoose'
import { mongoUrl } from '../config'
import { GoodModel, ShopModel } from '../models/shop'

const goodDetail = async (req, res) => {
    let { params } = req
    try {
      await mongoose.connect(mongoUrl)
      let goodsList = await GoodModel.find(params)
      let filterList = goodsList.filter(item => item.gid === params.gid)
      if (filterList.length > 0) {
        let shopDetails = filterList[0]
        let shopList = await ShopModel.find({ shopid: shopDetails.shopid })
        if (shopList.length > 0) {
          shopDetails.shop = shopList[0].name
        }
        let { info, imgList, shopid, gid, shop } = shopDetails
        res.send({ success: true, info, imgList, shopid, gid, shop })
      } else {
        res.send({ success: false, error: '该商品不存在' })
      }
    } catch (err) {
      res.send({ success: false, error: err })
    }
}


module.exports = {
    goodDetail
}
