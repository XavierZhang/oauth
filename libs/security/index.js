'use strict';
var cipher = require('./cipher');
var hash = require('./hash');
var hmac = require('./hmac');
var md5 = require('./md5');


var security = {};
security.cipher = require('./cipher')
security.hash = require('./hash')
security.hmac = require('./hmac')
security.md5 = require('./md5')

module.exports = security;
