const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subcategory: {
    type: String,
    required: true,
    trim: true
  },
  reviews: {
    type: Number,
    default: 0,
    comment: 'Holds the number of reviews of this book'
  },
  deletedAt: {
    type: Date
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  bookCover: {
    type: String,
    required: true
  },
  releasedAt: {
    type: Date,
    required: true
  },
 
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;