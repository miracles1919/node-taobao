import mongoose, { model } from 'mongoose'
import { mongoUrl } from '../config'
import CartModel from '../models/cart'

const pay = async (req, res) => {
  let { payList } = req.body

  try {
    await mongoose.connect(mongoUrl)
    let promises = payList.map(({ uid, gid, select }) => {
      return (async () => {
        console.log({ uid, gid, select })
        await CartModel.remove({ uid, gid, select })
      })()
    })
    await Promise.all(promises)
    res.send({ success: true, message: '支付成功' })
  } catch (err) {
    res.send({ success: false, error: err })
  }
}

module.exports = {
  pay
}
