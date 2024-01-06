const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not_found');
const myError = require('../middlewares/error');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/w?w?w?\.?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{5,}#?/),
  }).unknown(true),
}), createUser);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('*', (req, res, next) => {
  next(new NotFound());
});

router.use(errorLogger);
router.use(errors());
router.use(myError);

module.exports = router;
