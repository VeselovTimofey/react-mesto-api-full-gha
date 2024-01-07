/* eslint-disable consistent-return */
/* eslint-disable quotes */
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://veselov.students.nomoredomainsmonster.ru',
  'https://api.veselov.students.nomoredomainsmonster.ru',
  'localhost:3000',
];

function checkCORS(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
}

module.exports = checkCORS;
