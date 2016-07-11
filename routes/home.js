var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'Fly Tracer Admin System'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Fly Tracer Admin System'
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/'
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
