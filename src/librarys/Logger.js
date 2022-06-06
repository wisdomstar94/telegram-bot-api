const winston = require('winston');
const dayjs = require('dayjs');
const appRoot = require('app-root-path');
require('winston-daily-rotate-file');
require('date-utils');

const Logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.DailyRotateFile({
      filename : appRoot + '/logs/system.log',
      zippedArchive: true,
      json: true,
      format: winston.format.printf(
        info => `${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`
      )
    }),
    new winston.transports.Console({
      json: true,
      format: winston.format.printf(
        info => `${dayjs().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`
      )
    })
  ]
});

Logger.stream = {
  write: function(message, encoding) {
    Logger.info(message.replace('\n', ''));
  }
};

module.exports = Logger;
