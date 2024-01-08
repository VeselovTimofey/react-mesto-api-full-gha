const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const avatarReqularExpressions = require('../constants/reqular_expressions');

routerUser.get('/', getUsers);
routerUser.get('/me', getMe);
routerUser.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);
routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
routerUser.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(new RegExp(avatarReqularExpressions)).required(),
  }),
}), updateAvatar);

module.exports = routerUser;
