import mongoose from 'mongoose'
import { GoodModel, ShopModel } from '../models/shop'
import { mongoUrl } from '../config'

const goodsList = [{
  info: {
      title: 'Lilbetter男士短袖 时尚圆领印花体恤简约宽松上衣帅气半袖T恤男',
      subtitle: '领券满199减10 299减20',
      price: '99',
      promoPrice: '89',
      active: '满9.9元,包邮',
      sort: {
          size: ['165/S', '170/M', '175/L'],
          color: ['白色', '黑色']
      }
  },
  imgList: [
      'http://p7exvs3xz.bkt.clouddn.com/tshirt1.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/tshirt2.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/tshirt3.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/tshirt4.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/tshirt5.jpg',
  ],
  shopid: 'lilbetter',
  gid: 'lilbetter-1'
}, {
  info: {
      title: 'xiaomi小米官方旗舰店移动电源2 10000充电宝超薄便携大容量金属',
      subtitle: '双向快充 双USB输出',
      price: '89',
      promoPrice: '79',
      active: '满150元,包邮',
      sort: {
        color: ['白色', '黑色']
      }
    },
  imgList: [
      'http://p7exvs3xz.bkt.clouddn.com/mi1.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/mi2.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/mi3.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/mi4.jpg',
      'http://p7exvs3xz.bkt.clouddn.com/mi5.jpg',
  ],
  shopid: 'xiaomi',
  gid: 'xiaomi-1'
}]

const shopList = [{
  shopid: 'lilbetter',
  name: 'libetter旗舰店'
}, {
  shopid: 'xiaomi',
  name: '小米旗舰店'
}]

const init = () => {
  mongoose.connect(mongoUrl, err => {
    if (!err) {
      console.log('连接成功')
      GoodModel.find((err, docs) => {
        if (docs.length === 0) {
          GoodModel.create(...goodsList, err => {
            if (!err) {
              console.log('商品创建成功')
            }
          })
        }
      })

      ShopModel.find((err, docs) => {
        if (docs.length === 0) {
          ShopModel.create(...shopList, err => {
            if (!err) {
              console.log('店家创建成功')
            }
          })
        }
      })
    }
  })
}

init()
