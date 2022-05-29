const { ErrorHandler } = require('../helpers/error');
const User = require('../models/user');

/** Function for get the whole list of the users from data base. */
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('+password');
    res.status(200).send(users);
  } catch (err) {
    console.log('Error in getUsers: ', err);
    res.status(500).send({ message: 'Somthing went wrong.' });
  }
};

/** Function for select specific user from the data base. */
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
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

/** Updating user's name and about in route '/users/me'. */
const updateProfile = async (req, res) => {
  console.log(req.body);
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).select('+password');
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

/** Updating the user's avatar with route '/users/me/avatar'. */
const updateProfileAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).select('+password');
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
  getCurrentUser,
  updateProfile,
  updateProfileAvatar,
};
