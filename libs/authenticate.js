'use strict';

var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;
var db = require('./mongodb');

var oauth = new oauthServer({
  model: require('./models.js')
});

module.exports = function(options) {
  var options = options || {};
  return function(req, res, next) {
    var request = new Request({
      headers: {
        authorization: req.headers.authorization
      },
      method: req.method,
      query: req.query,
      body: req.body
    });
    var response = new Response(res);

    oauth.authenticate(request, response, options)
      .then(function(token) {
        // Request is authorized.
        req.user = token
        next()
      })
      .catch(function(err) {
        res.status(err.code || 500).json(err)
      });
  }
}
