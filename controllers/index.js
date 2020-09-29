const {
  getAllUsers, getUser, createUser, updateUser, updateUserAvatar, login,
} = require('./users');

const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('./cards');

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
