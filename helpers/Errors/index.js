const IncorrectDataError = require('./IncorrectDataError');
const AuthorizedError = require('./AuthorizedError');
const NotFoundError = require('./NotFoundError');
const ServerError = require('./ServerError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  ServerError,
  IncorrectDataError,
  NotFoundError,
  AuthorizedError,
  ConflictError,
  ForbiddenError,
};
