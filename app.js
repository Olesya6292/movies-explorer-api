/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./middlewares/errorsHandler');
const limiter = require('./utils/limiter');
const router = require('./routes');

const { PORT, DATABASE_URL } = require('./utils/config');

const app = express();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch(() => {
    console.log('Error to db connection');
  });

app.use(limiter);
app.use(cors());
app.use(requestLogger);
app.use(helmet());
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Server listen on ${PORT}`);
});
