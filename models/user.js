const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { AuthorizedError } = require('../helpers/Errors');
const { validateText } = require('../helpers/validators');
const { ERROR_MESSAGE } = require('../constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (name) => validateText(name),
      message: 'Введите правильный текст',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (name) => validateText(name),
      message: 'Введите правильный текст',
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Введите правильный url',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizedError(ERROR_MESSAGE.UNAUTHORIZED);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
