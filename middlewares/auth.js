const jwt = require('jsonwebtoken');
const { ERROR_MESSAGE } = require('../constants');
const AuthorizedError = require('../helpers/Errors/AuthorizedError');

const { JWT_SECRET = 'kriptostojkij-psevdosluchajnyj-klyuch-777' } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  const extractedToken = token.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(extractedToken, JWT_SECRET);
  } catch (err) {
    throw new AuthorizedError(ERROR_MESSAGE.NOT_AUTHORIZED);
  }

  req.user = payload;

  return next();
};
