const {
  getAllUsers, getUser, createUser, updateUser, updateUserAvatar,
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
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
