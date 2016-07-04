'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RefreshTokenSchema = new Schema({
  refresh_token: String,
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

module.exports = mongoose.model('refresh_token', RefreshTokenSchema);
