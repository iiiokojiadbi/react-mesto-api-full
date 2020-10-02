const { Card } = require('../models');
const { LIKE_OPTIONS, ERROR_MESSAGE } = require('../constants');
const { IncorrectDataError, NotFoundError, ForbiddenError } = require('../helpers/Errors');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .catch((err) => new IncorrectDataError(`${ERROR_MESSAGE.INCORRECT_DATA}: ${err.message}`))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId).orFail().catch(() => {
    throw new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND);
  }).then((card) => {
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError(ERROR_MESSAGE.NOT_AUTHORIZED);
    }
    Card.findByIdAndRemove(cardId)
      .then((cardData) => res.send({ data: cardData }))
      .catch(next);
  })
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
    .catch(() => new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
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
    .orFail()
    .catch(() => new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
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
