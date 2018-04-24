var express = require('express');
var router = express.Router();
import { login, register } from '../controller/user'
import { goodDetail } from '../controller/shop'
import { addCart, cartList, delCart } from '../controller/cart'

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

module.exports = router
