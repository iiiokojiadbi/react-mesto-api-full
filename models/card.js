const mongoose = require('mongoose');
const { validateText, validateUrl } = require('../helpers/validators');

const cardSchema = new mongoose.Schema({
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
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validateUrl(link),
      message: 'Введите правильный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectID,
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
