const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const {
  errors,
} = require('celebrate');
const {
  ErrorHandler,
  customErrorHandler,
} = require('./helpers/error');
const {
  requestLogger,
  errorLogger,
} = require('./middleware/logger');
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  createUser,
  loginUser,
} = require('./controllers/auth');
const {
  auth,
} = require('./middleware/auth');

const allowedOrigins = [
  'https://nitzancohen.students.nomoreparties.sbs/',
  'https://www.nitzancohen.students.nomoreparties.sbs/',
  'https://api.nitzancohen.students.nomoreparties.sbs/',
];

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options(allowedOrigins, cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

/** Unathuorized routes */
app.post('/signup', createUser);
app.post('/signin', loginUser);

app.use(auth);

/** Athuorized routes */
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use((req, res) => {
  throw new ErrorHandler(404, 'The requested resource was not found.');
});

app.use((err, req, res, next) => {
  customErrorHandler(err, res);
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
