const Card = require('../models/card');
const { ErrorHandler } = require('../helpers/error');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
    return cards;
  } catch (err) {
    console.log('Error in getCards: ', err);
    return next(ErrorHandler(500, 'Somthing went wrong.'));
  }
};

const createNewCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
    return newCard;
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(`Error in createNewCard: ${err}`);
      return next(ErrorHandler(400, `${err.name}: Somthing wrong with the input.`));
    }
    console.log(`Error in createNewCard: ${err}`);
    return next(ErrorHandler(500, `${err.name}: Somthing wrong with the server.`));
  }
};

const deleteCard = async (req, res, next) => {
  const cardId = req.params.card_id;
  try {
    const card = await Card.findById(cardId);
    console.log(`card in deleteCard function: ${card}`);

    if (card === null) {
      return next(ErrorHandler(404, 'Card id isn\'t found.'));
    }
    if (card.owner._id.toString() !== req.user._id) {
      return next(ErrorHandler(403, 'Unathouraized: you are not card\'s owner.'));
    }
    await Card.findByIdAndDelete(cardId);
    res.status(200).send({ message: `Card id ${cardId} was deleted.` });
    return { message: `Card id ${cardId} was deleted.` };
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in deleteCard function: ', err.name);
      return next(ErrorHandler(400, `${err.name}: Somthing went wrong with the input.`));
    }
    console.log('Error in deleteCard function: ', err.name);
    return next(ErrorHandler(500, `${err.name}: Somthing went wrong with the server.`));
  }
};

const likeCard = async (req, res, next) => {
  const cardId = req.params.card_id;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      return next(ErrorHandler(404, 'Card id isn\'t found.'));
    }
    res.status(200).send({ message: `Card ${cardId} was liked.` });
    return { message: `Card ${cardId} was liked.` };
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in likeCard function: ', err.name);
      return next(ErrorHandler(400, `${err.name}: Somthing went wrong with the input.`));
    }
    console.log('Error in likeCard function: ', err);
    return next(ErrorHandler(500, `${err.name}: Somthing went wrong with the server.`));
  }
};

const dislikeCard = async (req, res, next) => {
  const cardId = req.params.card_id;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      return next(ErrorHandler(404, 'Card id isn\'t found.'));
    }
    res.status(200).send({ message: `Card ${cardId} was disliked.` });
    return { message: `Card ${cardId} was disliked.` };
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in dislikeCard function: ', err);
      return next(ErrorHandler(400, `${err.name}: Somthing went wrong with the input.`));
    }
    console.log('Error in dislikeCard function: ', err);
    return next(ErrorHandler(500, `${err.name}: Somthing went wrong with the server.`));
  }
};

module.exports = {
  getCards,
  deleteCard,
  createNewCard,
  likeCard,
  dislikeCard,
};
