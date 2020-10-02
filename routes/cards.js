const express = require('express');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers');
const { validateCard, validateId } = require('../middlewares');

const cardsRouter = express.Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCard, createCard);
cardsRouter.put('/:cardId/likes', validateId, likeCard);
cardsRouter.delete('/:cardId/likes', validateId, dislikeCard);
cardsRouter.delete('/:cardId', validateId, deleteCard);

module.exports = cardsRouter;
