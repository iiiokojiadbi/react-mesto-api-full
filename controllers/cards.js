const { Card } = require('../models');
const { LIKE_OPTIONS, ERROR_MESSAGE } = require('../constants');
const { IncorrectDataError, NotFoundError } = require('../helpers/Errors');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .orFail(new IncorrectDataError(ERROR_MESSAGE.INCORRECT_DATA))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new IncorrectDataError(ERROR_MESSAGE.INCORRECT_DATA))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: _id },
    },
    LIKE_OPTIONS,
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: _id },
    },
    LIKE_OPTIONS,
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
