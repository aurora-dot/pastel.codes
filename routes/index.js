var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, _next) {
  res.render('index', { title: 'Home', description: "Hello, I'm E" });
});

module.exports = router;
