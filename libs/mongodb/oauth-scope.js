'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OAuthScopeSchema = new Schema({
  scope: String,
  is_default: Boolean
});

module.exports = mongoose.model('oauth_scope', OAuthScopeSchema);
