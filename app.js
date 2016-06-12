var express = require('express');
var compression = require('compression');
var config = require('./config');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);

var app = express();


app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
require('./libs/expressOAuth')(app)

var port = process.env.PORT || config.port;

app.get("/", function(req, res) {
  res.send("Welcome to my oauth api.");
});

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

app.listen(port, function() {
  log.info("OAuth service is running on PORT: " + port);
});
