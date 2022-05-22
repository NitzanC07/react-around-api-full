const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')
const cors = require('cors');
const {
  celebrate,
  Joi,
  errors,
} = require('celebrate');
const {
  requestLogger,
  errorLogger,
} = require('./middleware/logger');
require('dotenv').config();

const app = express();
const limiter = rateLimit({
  max: 100, // limit of 100 requests from each IP.
  windowMs: 15*60*1000, // 900,000ms = 15mins
  standardHeaders: true, //Return rate limit information in the headers.
	legacyHeaders: false, // Disable the X-RateLimit-* headers.
  message: 'Too many requests from this IP.', // Return a message if reqeusts reached to the limit.
});
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

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);
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
  res.status(404).send({ message: 'The requested resource was not found. ROOT PAGE' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'An error occurred on the server'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
