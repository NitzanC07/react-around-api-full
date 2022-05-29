const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');

const router = express.Router();
const {
  getCards,
  createNewCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

/** Every path begin with: /cards/... */
router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .pattern(new RegExp('/^http(s)?:\/{2}(w{3}.)?[\w-]+.\w+/ig'))
      .min(2)
      .max(30),
  }),
}), createNewCard);

router.delete('/:card_id', celebrate({
  params: Joi.object().keys({
    card_id: Joi.string().alphanum(),
  }),
}), deleteCard);

router.put('/:card_id/likes', celebrate({
  params: Joi.object().keys({
    card_id: Joi.string().alphanum(),
  }),
}), likeCard);

router.delete('/:card_id/likes', celebrate({
  params: Joi.object().keys({
    card_id: Joi.string().alphanum(),
  }),
}), dislikeCard);

module.exports = router;
