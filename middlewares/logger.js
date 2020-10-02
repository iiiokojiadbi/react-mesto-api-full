const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const dirPath = path.join(__dirname, '../logs');

const requestLoggerMiddleware = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(dirPath, 'request.log') }),
  ],
  format: winston.format.json(),
});

const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(dirPath, 'error.log') }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLoggerMiddleware,
  errorLoggerMiddleware,
};
