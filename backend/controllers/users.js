const User = require('../models/user');

// Function for get the whole list of the users in data base.
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    console.log('Error in getUsers: ', err);
    res.status(500).send({ message: 'Somthing went wrong.' });
  }
};

// Function for a specific user from the data base.
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    if (!user) {
      res.status(404).send({ message: 'User ID not found.' });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in getUserById, status 400: ', err.name);
      res.status(400).send({ message: `${err.name}: Something wrong with the input.` });
    } else {
      console.log('Error in getUserById, status 500: ', err.name);
      res.status(500).send({ message: 'Somthing went wrong with the server.' });
    }
  }
};

// Function for creating new user to data base.
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log('Error in createUser: ', err.name);
      res.status(400).send({ message: `${err.name}: Something wrong with the input.` });
    } else {
      console.log('Error in createUser: ', err.name);
      res.status(500).send({ message: `${err.name}: Somthing went wrong with the server.` });
    }
  }
};

const updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log('Error in updateProfile: ', err);
      res.status(400).send({ message: `${err.name}: Something wrong with the input.` });
    } else {
      console.log('Error in updateProfile: ', err);
      res.status(500).send({ message: `${err.name}: Something wrong with the server.` });
    }
  }
};

const updateProfileAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log('Error in updateProfileAvatar: ', err.name);
      res.status(400).send({ message: `${err.name}: Something wrong with the input.` });
    } else {
      console.log('Error in updateProfileAvatar: ', err);
      res.status(500).send({ message: `${err.name}: Something wrong with the server.` });
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateProfileAvatar,
};
