'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sqldb = require('../sqldb');
var security = require('../security');

module.exports = (function() {
  var ftUser = sqldb.FTUser;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    ftUser.findById(id)
      .then(function(user) {
        done(null, user);
      }).catch(function(err) {
      done(err);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'username'
  }, function(username, password, done) {
    //实现用户名或邮箱登录
    //这里判断提交上的username是否含有@，来决定查询的字段是哪一个
    var criteria = (username.indexOf('@') === -1) ? {
      user_name: username,
      password: security.md5.encrypt(password, config.passwordSalt).toUpperCase()
    } : {
      email: username,
      password: security.md5.encrypt(password, config.passwordSalt).toUpperCase()
    };
    ftUser.findOne(criteria)
      .then(function(user) {
        if (!user) return done(null, false, {
            message: '用户名或密码错误！'
          });
        return done(null, user);
      }).catch(function(err) {
      return done(err, false, {
        message: '用户名或密码错误！'
      });
    });
  }));
})();
