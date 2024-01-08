require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const checkCORS = require('./middlewares/CORSAllowed');
const myError = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PATHDB = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;
const app = express();

app.use(express.json());

mongoose.connect(PATHDB, {});

app.use(checkCORS);

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(myError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
