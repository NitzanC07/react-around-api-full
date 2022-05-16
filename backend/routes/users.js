const express = require('express');

const router = express.Router();
const {
  getUsers,
  getUserById,
  gerCurrentUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', gerCurrentUser);
router.get('/:user_id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateProfileAvatar);

module.exports = router;
