const IncorrectDataError = require('./IncorrectDataError');
const AuthorizedError = require('./AuthorizedError');
const NotFoundError = require('./NotFoundError');
const ServerError = require('./ServerError');

module.exports = {
  ServerError,
  IncorrectDataError,
  NotFoundError,
  AuthorizedError,
};
