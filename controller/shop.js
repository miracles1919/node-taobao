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

const goodDetail = (req, res) => {
    let { params } = req
    let filterList = goodsList.filter(item => item.gid === params.gid)
    if (filterList.length > 0) {
        res.send(Object.assign({ success: true }, filterList[0]))
    } else {
        res.send({ success: false, error: '该商品不存在' })
    }
}

const shopInfo = (shopid) => {
    let filterItem
}

module.exports = {
    goodDetail
}
