const mongoose = require('mongoose');

// Creating template for user information.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: /^http(s)?:\/{2}(w{3}.)?[\w-]+.\w+/ig,
    },
  },
});

// Creating a model and export it for user information.
module.exports = mongoose.model('user', userSchema);
