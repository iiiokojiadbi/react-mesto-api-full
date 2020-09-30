const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UPDATE_OPTIONS, ERROR_MESSAGE } = require('../constants');
const { NotFoundError } = require('../helpers/Errors');

const { JWT_SECRET = 'kriptostojkij-psevdosluchajnyj-klyuch-777' } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { user } = req.params;

  User.findById(user)
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((userData) => res.send({ data: userData }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь океана',
    avatar = 'https://www.culture.ru/storage/images/7402348bcfde8ad237620a095b568c12/f33b1160f0b1e42a11f80583a84f5a9f.jpeg',
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
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
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
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
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie('token', `Bearer ${token}`, { httpOnly: true, sameSite: true });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
