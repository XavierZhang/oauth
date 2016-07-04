'use strict';
var mongodb = require('./mongodb');
var log = require('./log')(module);

var Thing = mongodb.Thing;
var OAuthAccessToken = mongodb.OAuthAccessToken;
var OAuthAuthorizationCode = mongodb.OAuthAuthorizationCode;
var OAuthClient = mongodb.OAuthClient;
var OAuthRefreshToken = mongodb.OAuthRefreshToken;
var OAuthScope = mongodb.OAuthScope;
var User = mongodb.User;

OAuthScope.find({}).remove()
  .then(function() {
    OAuthScope.create({
      scope: 'admin',
      is_default: true
    },
      {
        scope: 'user_admin',
        is_default: true
      },
      {
        scope: 'user',
        is_default: false
      })
      .then(function() {
        // log.info('finished populating OAuthScope');
      });
  });

User.find({}).remove()
  .then(function() {
    User.create({
      user_name: 'admin',
      password: 'admin',
      first_name: "tech",
      last_name: "welin",
      email: "xavier.zhang@welintech.com",
      email_verified: true,
      scope: "admin"
    })
      .then(function(user) {
        // log.info('finished populating users', user);
        return OAuthClient.find({}).remove()
          .then(function() {
            OAuthClient.create({
              client_id: 'flytracer_admin',
              client_secret: 'flytracer_admin_key',
              redirect_uri: 'http://localhost:3000',
              User: user._id
            })
              .then(function(client) {
                // log.info('finished populating OAuthClient', client);
              }).catch(log.error);
          });

      });
  });


Thing.find({}).remove()
  .then(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
        'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
        'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
        'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
        'tests alongside code. Automatic injection of scripts and ' +
        'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
        'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
        'payload, minifies your scripts/css/images, and rewrites asset ' +
        'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
        'and openshift subgenerators'
    });
  });
