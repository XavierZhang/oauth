var winston = require('winston');
var config = require('../config');
winston.emitErrs = true;

function logger(module) {

  var winstonLogger = new winston.Logger({
    exitOnError: false
  });

  winstonLogger.add(require('winston-mongodb').MongoDB, {
    level: "error",
    db: config.mongo.uri,
    label: getFilePath(module),
    json: true,
    handleException: true
  });

  winstonLogger.add(require('winston-mail').Mail, {
    level: "error",
    from: "flight-luggage@qq.com",
    to: "16206406@qq.com",
    host: "smtp.qq.com",
    port: 465,
    username: "flight-luggage@qq.com",
    password: "ZLlwj&@!521",
    subject: "authentication service error",
    label: getFilePath(module),
    ssl: true,
    html: true,
    tls: false,
    handleException: true
  });

  winstonLogger.add(require('winston-daily-rotate-file'), {
    level: "info",
    json: true,
    label: getFilePath(module),
    handleException: true,
    filename: process.cwd() + '/logs/log',
    datePattern: ".yyyy-MM-dd",
    prepend: true
  });

  winstonLogger.add(winston.transports.Console, {
    level: "debug",
    label: getFilePath(module),
    handleException: true,
    json: false,
    colorize: true
  });
  return winstonLogger;
}

function getFilePath(module) {
  //using filename in log statements
  return module.filename.split('/').slice(-2).join('/');
}

module.exports = logger;
