var config = require('../../config')
var mongoose = require('mongoose');
var log = require('../log')(module);

mongoose.connect(config.mongo.uri, function(err) {
  if (err) return log.error("mongo connection error", err);
  log.info('Mongoose Connected');
});
var db = {};
db.OAuthAccessToken = require('./OAuthAccessToken')
db.OAuthAuthorizationCode = require('./OAuthAuthorizationCode')
db.OAuthClient = require('./OAuthClient')
db.OAuthRefreshToken = require('./OAuthRefreshToken')
db.OAuthScope = require('./OAuthScope')
db.User = require('./User')
db.Thing = require('./Thing')

module.exports = db;
