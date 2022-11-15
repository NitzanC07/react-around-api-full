const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');

const router = express.Router();
const {
  getUsers,
  getCurrentUser,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

/** Every path begin with: /users... */
router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(new RegExp('/^http(s)?:\/{2}(w{3}.)?[\w-]+.\w+/ig')), //eslint-disable-line
  }),
}), updateProfileAvatar);

module.exports = router;
