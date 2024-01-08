const routerCard = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const avatarReqularExpressions = require('../constants/reqular_expressions');

routerCard.get('/', getCards);
routerCard.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(new RegExp(avatarReqularExpressions)).required(),
  }),
}), createCard);
routerCard.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
routerCard.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
routerCard.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = routerCard;
