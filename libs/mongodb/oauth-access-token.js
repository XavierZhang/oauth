'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OAuthAccessTokenSchema = new Schema({
  access_token: String,
  expires: Date,
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

module.exports = mongoose.model('oauth_access_token', OAuthAccessTokenSchema);
