const { User } = require('../models');
const { UPDATE_OPTIONS, ERROR_CODE, ERROR_MESSAGE } = require('../constants');
const { errorHandler, createCustomError } = require('../helpers');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { user } = req.params;

  User.findById(user)
    .orFail()
    .then((userData) => res.send({ data: userData }))
    .catch((err) => createCustomError(
      err,
      ERROR_MESSAGE.USER_NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
    ))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => createCustomError(
      err,
      ERROR_MESSAGE.INCORRECT_USER_DATA,
      ERROR_CODE.INCORRECT_DATA,
    ))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar, name, about },
    UPDATE_OPTIONS,
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(
      err,
      ERROR_MESSAGE.USER_NOT_FOUND,
      ERROR_MESSAGE.INCORRECT_USER_DATA,
    ))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { avatar },
    UPDATE_OPTIONS,
  )
    .orFail()
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => errorHandler(
      err,
      ERROR_MESSAGE.USER_NOT_FOUND,
      ERROR_MESSAGE.INCORRECT_AVATAR_DATA,
    ))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
