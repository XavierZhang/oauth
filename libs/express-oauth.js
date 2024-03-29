'use strict';

var oauthServer = require('oauth2-server');
var log = require('./log')(module);
var Request = require('oauth2-server').Request;
var Response = require('oauth2-server').Response;
var db = require('./sqldb');
var authenticate = require('./authenticate');
var config = require('../config');

if (config.db === 'mongo') {
  db = require('./mongodb');
}

var oauth = new oauthServer({
  model: config.db === 'mongo' ? require('./models.js') : require('./models-sql.js'),
  grants: ['password', 'authorization_code', 'refresh_token']
});

module.exports = function(app) {
  app.all('/oauth/token', function(req, res, next) {
    var request = new Request(req);
    var response = new Response(res);

    oauth
      .token(request, response)
      .then(function(token) {
        return res.json(token)
      }).catch(function(err) {
      return res.status(500).json(err)
    })
  });

  app.post('/authorise', function(req, res) {
    var request = new Request(req);
    var response = new Response(res);

    return oauth.authorize(request, response).then(function(success) {
      //  if (req.body.allow !== 'true') return callback(null, false);
      //  return callback(null, true, req.user);
      res.json(success)
    }).catch(function(err) {
      res.status(err.code || 500).json(err)
    })
  });

  app.get('/authorise', function(req, res) {
    var query = {
      client_id: req.query.client_id
    };
    if (req.query.redirect_uri) {
      query.redirect_uri = req.query.redirect_uri;
    }
    log.info(query);
    return db.OAuthClient.findOne(query)
      .then(function(model) {
        if (!model) return res.status(404).json({
            error: 'Invalid Client'
          });
        return res.json(model);
      }).catch(function(err) {
      return res.status(err.code || 500).json(err)
    });
  });

// app.get('/secure', authenticate(), function(req, res) {
//   res.json({
//     message: 'Secure data'
//   })
// });
//
// app.get('/me', authenticate(), function(req, res) {
//   res.json({
//     me: req.user,
//     messsage: 'Authorization success, Without Scopes, Try accessing /profile with `profile` scope',
//     description: 'Try postman https://www.getpostman.com/collections/37afd82600127fbeef28',
//     more: 'pass `profile` scope while Authorize'
//   })
// });
//
// app.get('/profile', authenticate({
//   scope: 'profile'
// }), function(req, res) {
//   res.json({
//     profile: req.user
//   })
// });
}
