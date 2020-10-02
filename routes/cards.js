const express = require('express');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers');
const { validateCard, validateId } = require('../middlewares');

const cardsRouter = express.Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCard, createCard);
cardsRouter.put('/:_id/likes', validateId, likeCard);
cardsRouter.delete('/:_id/likes', validateId, dislikeCard);
cardsRouter.delete('/:_id', validateId, deleteCard);

module.exports = cardsRouter;
