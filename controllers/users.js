const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { UPDATE_OPTIONS, ERROR_MESSAGE } = require('../constants');
const { NotFoundError, ConflictError, IncorrectDataError } = require('../helpers/Errors');

const { JWT_SECRET = 'kriptostojkij-psevdosluchajnyj-klyuch-777' } = process.env;

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { user } = req.params;

  User.findById(user)
    .orFail()
    .catch(() => {
      throw new NotFoundError(ERROR_MESSAGE.NOT_FOUND);
    })
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
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError(ERROR_MESSAGE.СONFLICT_USER);
      } else next(err);
    })
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

  User.findByIdAndUpdate(
    req.user._id,
    { avatar, name, about },
    UPDATE_OPTIONS,
  )
    .orFail(() => new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new IncorrectDataError(`${ERROR_MESSAGE.INCORRECT_DATA}: ${err.message}`);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    UPDATE_OPTIONS,
  )
    .orFail(() => new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new IncorrectDataError(`${ERROR_MESSAGE.INCORRECT_DATA}: ${err.message}`);
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send('Успешная авторизация');
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
