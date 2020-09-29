const express = require('express');
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers');

const cardsRouter = express.Router();

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.delete('/:cardId', deleteCard);

module.exports = cardsRouter;
