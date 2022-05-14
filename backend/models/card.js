const mongoose = require('mongoose');

// Creating template for card information.
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: /^http(s)?:\/{2}(w{3}.)?[\w-]+.\w+/ig,
    },
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a model and export it for user information.
module.exports = mongoose.model('card', cardSchema);
