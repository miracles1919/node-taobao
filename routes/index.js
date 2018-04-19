var express = require('express');
var router = express.Router();
import { login, register } from '../controller/user'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login)

router.post('/register', register)

module.exports = router;
