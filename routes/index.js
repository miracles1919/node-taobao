var express = require('express');
var router = express.Router();
import { getUser } from '../controller/user'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', getUser)

module.exports = router;
