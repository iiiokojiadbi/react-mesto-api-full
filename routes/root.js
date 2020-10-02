const express = require('express');
const {
  createUser,
  login,
} = require('../controllers');
const { validateUser, validateLogin } = require('../middlewares');

const rootRouter = express.Router();

rootRouter.post('/signup', validateUser,
  createUser);
rootRouter.post('/signin', validateLogin,
  login);

module.exports = rootRouter;
