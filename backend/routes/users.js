const express = require('express');

const router = express.Router();
const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

// Every path begin with: /users/...
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

module.exports = router;
