const checkAuthorizationFieldsMiddleWare = require('./checkAuthorizationFields');
const authMiddleware = require('./auth');
const checkCorsMiddleware = require('./cors');

module.exports = { checkAuthorizationFieldsMiddleWare, authMiddleware, checkCorsMiddleware };
