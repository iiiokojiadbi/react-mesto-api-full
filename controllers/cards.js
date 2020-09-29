const { Card } = require('../models');
const { LIKE_OPTIONS, ERROR_CODE, ERROR_MESSAGE } = require('../constants');
const { createCustomError } = require('../helpers');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => createCustomError(
      err,
      ERROR_MESSAGE.INCORRECT_CARD_DATA,
      ERROR_CODE.INCORRECT_DATA,
    ))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(createCustomError(
      {
        message: ERROR_MESSAGE.INCORRECT_CARD_DATA,
      },
      ERROR_MESSAGE.CARD_NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
    ))
    .then((card) => res.send({ data: card }))
    .catch((err) => createCustomError(
      err,
      ERROR_MESSAGE.CARD_NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
    ))
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
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => createCustomError(
      err,
      ERROR_MESSAGE.CARD_NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
    ))
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
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => createCustomError(
      err,
      ERROR_MESSAGE.CARD_NOT_FOUND,
      ERROR_CODE.NOT_FOUND,
    ))
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
