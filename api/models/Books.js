const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

module.exports = mongoose.model('Books', booksSchema);
