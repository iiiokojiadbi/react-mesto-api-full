const express = require('express');
const {
  createUser,
  login,
} = require('../controllers');
const { checkAuthorizationFields } = require('../middlewares');

const rootRouter = express.Router();

rootRouter.post('/signup', checkAuthorizationFields,
  createUser);
rootRouter.post('/signin', checkAuthorizationFields,
  login);

module.exports = rootRouter;
