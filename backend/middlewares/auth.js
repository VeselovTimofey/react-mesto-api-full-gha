const jwt = require('jsonwebtoken');

const Unauthorized = require('../errors/unauthorized');

const {
  JWT_SECRET = 'd30bee6b8f85632012147b57c887203f66b3dbbafdca45f32a2db90fa7f65c88',
} = process.env;

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  try {
    if (!cookie) {
      throw new Unauthorized();
    }
  } catch (err) {
    next(err);
  }

  const token = cookie.replace('jwt=', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;

  next();
};
