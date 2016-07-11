'use strict';

var config = require('../../config')
var Sequelize = require('sequelize');

var db = {
  sequelize: new Sequelize(
    config.sql.database,
    config.sql.username,
    config.sql.password,
    config.sql.options
  )
};

db.OAuthAccessToken = db.sequelize.import('./oauth-access-token');
db.OAuthAuthorizationCode = db.sequelize.import('./oauth-authorization-code');
db.OAuthClient = db.sequelize.import('./oauth-client');
db.OAuthRefreshToken = db.sequelize.import('./oauth-refresh-token');
db.OAuthScope = db.sequelize.import('./oauth-scope');
db.User = db.sequelize.import('./user');
db.FTRole = db.sequelize.import('./ft_role');
db.FTUser = db.sequelize.import('./ft_user');

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
