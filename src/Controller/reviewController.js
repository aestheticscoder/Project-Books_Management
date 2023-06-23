const reviewModel = require("../Models/reviewModel");
const bookModel = require("../Models/bookModel");
const validator = require("../validations/validator");


// Post Review

const createReview = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const { rating, reviewedAt, reviewedBy } = req.body;
    if (!bookId) {
      return res
        .status(404)
        .json({ status: false, message: "Please Provide BookId" });
    }
    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid BookId Format" });
    }
    if (!rating || !reviewedAt) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Missing Details, Please Provide Appropriate Details",
        });
    }
    if (!(rating >= 1 && rating <= 5)) {
      return res.status(400).json({ status: false, message: "Invalid Rating" });
    }
    const findBook = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!findBook) {
      return res
        .status(404)
        .json({
          status: false,
          message: "No Book found with the Given BookId",
        });
    }
    if (findBook.isDeleted === true) {
      return res
        .status(404)
        .json({ status: false, message: "This Book has been Deleted" });
    }

    const reviewDetails = {
      rating: rating,
      bookId: bookId,
      reviewedAt: reviewedAt,
    };
    if (req.body.review) {
      reviewDetails.review = req.body.review;
    }
    if (reviewedBy) {
      reviewDetails.reviewedBy = reviewedBy;
    }
    const reviewsCreate = await reviewModel.create(reviewDetails);
    const book = await bookModel.findByIdAndUpdate(
      bookId,
      { $inc: { reviews: 1 } },
      { new: true }
    );
    book.reviewsData = reviewsCreate;
    res
      .status(201)
      .json({ status: true, message: "Review added successfully", data: book });
  } catch (error) {
    if (error.message.includes("validation")) {
      return res.status(400).send({ status: false, message: error.message });
    } else if (error.message.includes("duplicate")) {
      return res.status(400).send({ status: false, message: error.message });
    } else {
      res.status(500).json({ status: false, message: error.message });
    }
  }
};

// Update Review

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const bookId = req.params.bookId;
    if (!reviewId) {
      return res
        .status(404)
        .json({ status: false, message: "Please enter Review Id" });
    }
    if (!bookId) {
      return res
        .status(404)
        .json({ status: false, message: "Please Enter BookId" });
    }
    if (!validator.isValidObjectId(bookId) && !validator.isValidObjectId(reviewId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid ObjectId" });
    }
    const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ status: false, message: "No Book with this ID exists" });
    }
    if(book.isDeleted === true) {
        return res.status(404).json({ status: false, message: "This Book has been Deleted" });
    }
    const review = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false,
    });
    if (!review) {
      return res
        .status(404)
        .json({ status: false, message: "Review not found" });
    }
    if (bookId != review.bookId) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid BookId" });
    }
    const updatedReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({
        status: true,
        message: "Review Updated successfully",
        data: updatedReview,
      });
  } catch (error) {
    if (error.message.includes("validation")) {
      return res.status(400).send({ status: false, message: error.message });
    } else if (error.message.includes("duplicate")) {
      return res.status(400).send({ status: false, message: error.message });
    } else {
      res.status(500).json({ status: false, message: error.message });
    }
  }
};

// Delete Review

const deletedReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const bookId = req.params.bookId;
    if (!reviewId || !bookId) {
      return res
        .status(404)
        .json({
          status: false,
          message: "ReviewId / BookId not found in Params",
        });
    }
    if (!validator.isValidObjectId(bookId) && !validator.isValidObjectId(reviewId)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid ObjectId" });
    }
    const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({ status: false, message: "No Book with this ID Found" });
    }
    if(book.isDeleted === true) {
        return res.status(404).json({ status: false, message: "The Book has been Deleted" });
    }
    const review = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false,
    });
    if (!review) {
      return res
        .status(404)
        .json({ status: false, message: "No Reviews Found" });
    }
    if (bookId != review.bookId) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid BookId" });
    }
    const bookUpdated = await bookModel.findByIdAndUpdate(
      bookId,
      { $inc: { reviews: -1 } },
      { new: true }
    );
    const reviewUpdated = await reviewModel.findByIdAndUpdate(
      reviewId,
      { $set: { isDeleted: true } },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "Review Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  createReview,
  updateReview,
  deletedReview,
};
