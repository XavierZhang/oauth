var config = require('../../config')
var mongoose = require('mongoose');
var log = require('../log')(module);

mongoose.connect(config.mongo.uri, function(err) {
  if (err) return log.error("mongo connection error", err);
  log.info('Mongoose Connected');
});
var db = {};
db.OAuthAccessToken = require('./oauth-access-token')
db.OAuthAuthorizationCode = require('./oauth-authorization-code')
db.OAuthClient = require('./oauth-client')
db.OAuthRefreshToken = require('./oauth-refresh-token')
db.OAuthScope = require('./oauth-scope')
db.User = require('./user')
db.Thing = require('./thing')

module.exports = db;
