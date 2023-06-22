const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
    trim: true
  },
  reviewedBy: {
    type: String,
    required: true,
    default: 'Guest',
    value: "reviewer's name",
    trim: true
  },
  reviewedAt: {
    type: Date,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    trim: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true 
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
