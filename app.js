var express = require('express');
var compression = require('compression');
var config = require('./config');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var cookieParser = require('cookie-parser');
var session = require('express-session');

require('./libs/passport/init');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: config.sessionSalt
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

require('./libs/express-oauth')(app);

require("./routes")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    log.error(app.get('env'), err);

    res.status(err.status || 500)
      .json({
        message: err.message,
        error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  log.error(app.get('env'), err);

  res.status(err.status || 500)
    .json({
      message: err.message,
      error: {}
    });
});

// app.listen(port, function() {
//   log.info("OAuth service is running on PORT: " + port);
// });
module.exports = app;
