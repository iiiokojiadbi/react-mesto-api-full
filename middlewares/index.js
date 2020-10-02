const authMiddleware = require('./auth');
const checkCorsMiddleware = require('./cors');
const {
  validateLogin,
  validateAvatar,
  validateUserUpdate,
  validateUser,
  validateId,
  validateCard,
} = require('./validators');

module.exports = {
  authMiddleware,
  checkCorsMiddleware,
  validateLogin,
  validateAvatar,
  validateUserUpdate,
  validateUser,
  validateId,
  validateCard,
};
