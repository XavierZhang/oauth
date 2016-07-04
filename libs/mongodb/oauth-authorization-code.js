'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OAuthAuthorizationCodeSchema = new Schema({
  auth_code: String,
  expires: Date,
  redirect_uri: String,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  oauth_client: {
    type: Schema.Types.ObjectId,
    ref: 'oauth_client'
  },
});

module.exports = mongoose.model('oauth_auth_code', OAuthAuthorizationCodeSchema);
