const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    console.log('Error in getCards: ', err);
    res.status(500).send({ message: 'Somthing went wrong.' });
  }
};

const createNewCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const owner = req.user._id;
    const newCard = await Card.create({ name, link, owner });
    res.status(201).send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log(`Error in createNewCard: ${err}`);
      res.status(400).send({ message: `${err.name}: Somthing wrong with the input.` });
    } else {
      console.log(`Error in createNewCard: ${err}`);
      res.status(500).send({ message: `${err.name}: Somthing wrong with the server.` });
    }
  }
};

const deleteCard = async (req, res) => {
  const cardId = req.params.card_id;
  try {
    const card = await Card.findById(cardId);
    if (card === null) {
      res.status(404).send({ message: 'Card id isn\'t found.' });
    } else if (card.owner !== req.user._id){
      res.status(403).send({ message: 'Unathouraized: you are not card\'s owner.' })
    } else {
      await Card.findByIdAndDelete(cardId);
      res.status(200).send({ message: `Card id ${cardId} was deleted.` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in deleteCard function: ', err.name);
      res.status(400).send({ message: `${err.name}: Somthing went wrong with the input.` });
    } else {
      console.log('Error in deleteCard function: ', err.name);
      res.status(500).send({ message: `${err.name}: Somthing went wrong with the server.` });
    }
  }
};

const likeCard = async (req, res) => {
  const cardId = req.params.card_id;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      res.status(404).send({ message: 'Card id isn\'t found.' });
    } else {
      res.status(200).send({ message: `Card ${cardId} was liked.` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in likeCard function: ', err.name);
      res.status(400).send({ message: `${err.name}: Somthing went wrong with the input.` });
    } else {
      console.log('Error in likeCard function: ', err);
      res.status(500).send({ message: `${err.name}: Somthing went wrong with the server.` });
    }
  }
};

const dislikeCard = async (req, res) => {
  const cardId = req.params.card_id;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (card === null) {
      res.status(404).send({ message: 'Card id isn\'t found.' });
    } else {
      res.status(200).send({ message: `Card ${cardId} was disliked.` });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      console.log('Error in dislikeCard function: ', err);
      res.status(400).send({ message: `${err.name}: Somthing went wrong with the input.` });
    } else {
      console.log('Error in dislikeCard function: ', err);
      res.status(500).send({ message: `${err.name}: Somthing went wrong with the server.` });
    }
  }
};

module.exports = {
  getCards,
  deleteCard,
  createNewCard,
  likeCard,
  dislikeCard,
};
