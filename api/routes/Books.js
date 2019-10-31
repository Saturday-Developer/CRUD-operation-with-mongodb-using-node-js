const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Books');

router.get('/', (req, res, next) => {
  Book.find()
    .exec()
    .then(booksList => res.status(200).json(booksList))
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/', (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  book
    .save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
  res.status(200).json({
    message: 'New Book Item has been created'
  });
});

router.delete('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.get('/:bookId', (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .exec()
    .then(book => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
