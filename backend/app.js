const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
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

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(helmet());
app.use(bodyParser.json());

/** Unathuorized routes */
app.post('/signup', createUser);
app.post('/login', loginUser);

app.use(auth);

/** Athuorized routes */
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'The requested resource was not found. MAIN PAGE' });
});

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
