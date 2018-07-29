var express = require('express')
var router = express.Router()

import { login, register, getUserInfo, setUserInfo, addAddress, delAddress } from '../controller/user'
import { goodDetail } from '../controller/shop'
import { addCart, cartList, delCart } from '../controller/cart'
import { pay } from '../controller/pay'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login)

router.post('/register', register)

router.get('/detail/:gid', goodDetail)

router.post('/addCart', addCart)

router.post('/delCart', delCart)

router.get('/cartList/:uid', cartList)

router.post('/pay', pay)

router.get('/user', getUserInfo)

router.post('/modUser', setUserInfo)

router.post('/addAddress', addAddress)

router.post('/delAddress', delAddress)

router.all('/request', (req, res) => {
  console.log(req.method)
  let { method } = req
  let { callback } = req.query
  let result = { method, success: true }
  if (callback) {
    res.jsonp(result)
  }
  res.json(result)
})

module.exports = router
