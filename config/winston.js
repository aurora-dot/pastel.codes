var winston = require('winston');
var appRoot = require('app-root-path');

var logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

logger.stream = {
  write: function (message, _encoding) {
    logger.info(message);
  },
};
module.exports = logger;
