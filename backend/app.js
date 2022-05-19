const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { PORT = 3000 } = process.env;
const router = express.Router();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const {
  createUser,
  loginUser,
} = require('./controllers/auth');
const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');
const allowedOrigins = [
  'http://localhost:3001'
];

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.options(allowedOrigins, cors());

/** Unathuorized routes */
app.post('/signup', createUser);
app.post('/login', loginUser);

app.use(auth);

/** Athuorized routes */
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource was not found. ROOT PAGE' });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
