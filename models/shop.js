import mongoose from 'mongoose'
const { Schema } = mongoose

const GoodSchema = Schema({
  info: {
    title: String,
    subtitle: String,
    price: Number,
    promoPrice: Number,
    active: String,
    sort: {
      size: [String],
        color: [String],
    }
  },
  imgList: [String],
  shopid: String,
  gid: String,
})

const ShopSchema = Schema({
  shopid: String,
  name: String,
})

export const GoodModel = mongoose.model('good', GoodSchema)
export const ShopModel = mongoose.model('shop', ShopSchema)
