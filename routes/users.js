const express = require('express');
const {
  getAllUsers, getUser, updateUser, updateUserAvatar,
} = require('../controllers');

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

module.exports = userRouter;
