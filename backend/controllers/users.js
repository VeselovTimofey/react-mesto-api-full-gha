const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Unauthorized = require('../errors/unauthorized');
const NotFound = require('../errors/not_found');
const BadRequest = require('../errors/bad_request');
const Conflict = require('../errors/conflict');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId).orFail()
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Запрашиваемый пользователь не найден.'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
      about,
      avatar,
    }))
    .then((user) => {
      res.send({
        data: {
          name: user.name,
          email: user.email,
          about: user.about,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(`Были переданы некорректные данные: ${err.message}`));
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new Conflict('Такой email уже зарегистрирован.'));
      } else {
        next(err);
      }
    });
};

const _userUpdateLogic = (req, res, body, next) => {
  User.findByIdAndUpdate(req.user._id, body, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Запрашиваемый пользователь не найден.'));
      } else {
        next(err);
      }
    });
};

function updateUserDecorator(func) {
  return function updateUserFunction(req, res, next) {
    const { name, about } = req.body;
    func(req, res, { name, about }, next);
  };
}

function updateAvatarDecorator(func) {
  return function UpdateAvatarFunction(req, res, next) {
    const { avatar } = req.body;
    func(req, res, { avatar }, next);
  };
}

const updateUser = updateUserDecorator(_userUpdateLogic);
const updateAvatar = updateAvatarDecorator(_userUpdateLogic);

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((token) => {
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ email: req.body.email });
    })
    .catch((err) => next(new Unauthorized(err.message)));
};

const getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id).orFail()
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Запрашиваемый пользователь не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateAvatar, login, getMe,
};
