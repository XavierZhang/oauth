'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var OAuthClientSchema = new Schema({
  client_id: String,
  client_secret: String,
  redirect_uri: String,
  name: String,
  grant_types: String,
  scope: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
});

module.exports = mongoose.model('oauth_client', OAuthClientSchema);
