var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/users', function(req, res, next) {
  res.render('users/index', {
    title: '用户列表'
  });
});

module.exports = router;
