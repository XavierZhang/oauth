'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_name: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String,
  email_verified: Boolean,
  airport: String, //机场编码
  airline: String, //航空公司编码
  license: Number, //授权数量
  salt: String, //随机生成的密码key
  status: Number, //0-活动状态，1-锁定状态
  scope: String
});

module.exports = mongoose.model('user', UserSchema);
