const express = require('express');
const {
  createUser,
  login,
} = require('../controllers');
const { checkAuthorizationFieldsMiddleWare } = require('../middlewares');

const rootRouter = express.Router();

rootRouter.post('/signup', checkAuthorizationFieldsMiddleWare,
  createUser);
rootRouter.post('/signin', checkAuthorizationFieldsMiddleWare,
  login);

module.exports = rootRouter;
