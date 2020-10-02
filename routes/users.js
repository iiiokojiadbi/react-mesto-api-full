const express = require('express');
const {
  getAllUsers, getUser, updateUser, updateUserAvatar,
} = require('../controllers');
const { validateId, validateUserUpdate, validateAvatar } = require('../middlewares');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:_id', validateId, getUser);
userRouter.patch('/me', validateUserUpdate, updateUser);
userRouter.patch('/me/avatar', validateAvatar, updateUserAvatar);

module.exports = userRouter;
