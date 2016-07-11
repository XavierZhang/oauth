'use strict';
var config = require('../config')
var sqldb = require('./sqldb');
var security = require('./security');
var log = require('./log')(module);

var OAuthAccessToken = sqldb.OAuthAccessToken;
var OAuthAuthorizationCode = sqldb.OAuthAuthorizationCode;
var OAuthClient = sqldb.OAuthClient;
var OAuthRefreshToken = sqldb.OAuthRefreshToken;
var OAuthScope = sqldb.OAuthScope;
var User = sqldb.User;
var FTRole = sqldb.FTRole;
var FTUser = sqldb.FTUser;

sqldb.sequelize.drop()
  .then(function() {
    sqldb.sequelize.sync({
      force: config.seedDBForce
    }).then(function() {
      FTRole.bulkCreate([
        {
          role: "full"
        }, {
          role: "read"
        }]).then(function() {
        return FTRole.findOne({
          where: {
            role: "full"
          }
        });
      }).then(function(role) {
        FTUser.create(
          {
            user_name: 'admin',
            password: security.md5.encrypt("admin", config.passwordSalt).toUpperCase(),
            first_name: "welin",
            last_name: "tech",
            email: "xavier.zhang@welintech.com",
            email_verified: true,
            role_id: role.id
          }).then(function() {});
      });
      return null;
    }).then(function() {
      OAuthScope.bulkCreate([
        {
          scope: 'user_admin_full',
          is_default: true
        },
        {
          scope: 'user_full',
          is_default: false
        }]).then(function() {});
    });
  });
