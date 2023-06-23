const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../Controller/userController");
const {
  createBooks,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../Controller/bookController");
const {
  createReview,
  updateReview,
  deletedReview,
} = require("../Controller/reviewController");
const authMiddleware = require("../middlewares/middleware");

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Register a Book
router.post("/registerBooks", createBooks);

// Get Book
router.get("/getBooks", authMiddleware, getBooks);

// Get Book by ID
router.get("/:bookId", authMiddleware, getBookById);

// Update Book by ID
router.put("/:bookId", authMiddleware, updateBook);

// Delete Book by ID
router.delete("/:bookId", authMiddleware, deleteBook);

// Post Review
router.post("/:bookId/review", createReview);

// Update Review
router.put("/:bookId/:reviewId", updateReview);

// Delete Review
router.delete("/:bookId/:review", deletedReview);

module.exports = router;
