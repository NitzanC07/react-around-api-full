const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/** Creating new user (register) to data base. With route '/users/register'. */
const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        email,
        password: hash,
      }))
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => {
        if (err.name === 'MongoServerError') {
          res.status(409).send({ message: `${err.name}: User already exists.` });
        } else {
          res.status(401).send({ message: `${err.name}: Email or password are missing.` });
        }
      });
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log('Error in createUser, status 400: ', err);
      res.status(400).send({ message: `${err.name}: Something wrong with the input.` });
    } else {
      console.log('Error in createUser, status 500: ', err.name);
      res.status(500).send({ message: `${err}: Somthing went wrong with the server.` });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).json(token);
    })
    .catch((err) => {
      res.status(401).send({ message: `Incorrect email or password: ${err.message}.` });
    });
};

module.exports = {
  createUser,
  loginUser,
};
