var express = require('express');
var router = express.Router();
import { login, register } from '../controller/user'
import { shopDetail } from '../controller/shop'
import { addCart } from '../controller/cart'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login)

router.post('/register', register)

router.get('/detail/:gid', shopDetail)

router.post('/addCart', addCart)

module.exports = router
