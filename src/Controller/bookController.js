const bookModel = require("../Models/bookModel");
const userModel = require("../Models/userModel");
const reviewModel = require("../Models/reviewModel");
const validator = require("../validations/validator");

// Create Book
const createBooks = async function (req, res) {
  try {
    let booksData = req.body;
    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      booksData;

    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Title" });
    }
    let uniqueTitle = await bookModel.findOne({ title });
    if (uniqueTitle) {
      return res
        .status(400)
        .send({ status: false, message: "Title is already used" });
    }
    if (!excerpt) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Excerpt" });
    }
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide UserId" });
    }
    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Not a Valid UserId" });
    }
    let findUser = await userModel.findOne({ _id: userId });
    if (!findUser) {
      return res
        .status(400)
        .send({ status: false, message: "No User with this ID Exists" });
    }
    if (!ISBN) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide ISBN" });
    }
    if (!validator.isValidISBN(ISBN)) {
      return res.status(400).send({ status: false, message: "Invalid ISBN" });
    }
    let uniqueISBN = await bookModel.findOne({ ISBN: ISBN });
    if (uniqueISBN) {
      return res
        .status(400)
        .send({ status: false, message: "This ISBN is already Registered" });
    }
    if (!category) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Category" });
    }
    if (!subcategory) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Subcategory" });
    }
    if (!releasedAt) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide ReleasedAt" });
    }
    if (!validator.isValidDate(releasedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Date Format" });
    }
    let saveBook = await bookModel.create(booksData);
    return res.status(201).send({
      status: true,
      message: "Your Book has been Saved",
      data: saveBook,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// Get Book
const getBooks = async function (req, res) {
  try {
    const filters = req.query;
    const filterKeys = Object.keys(filters);
    let query = {};

    // Apply filters
    if (filterKeys.includes("userId")) {
      query.userId = filters.userId;
    }
    if (filterKeys.includes("category")) {
      query.category = filters.category;
    }
    if (filterKeys.includes("subcategory")) {
      query.subcategory = filters.subcategory;
    }

    // Fetch books with applied filters
    let books = await bookModel
      .find(query)
      .select("_id title excerpt userId category releasedAt reviews")
      .sort({ title: 1 });

    // Check if any books found
    if (books.length === 0) {
      return res.status(404).send({ status: false, message: "No books found" });
    }

    return res.status(200).send({
      status: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// Get Book by ID
const getBookById = async function (req, res) {
  try {
    const bookId = req.params.bookId;

    // Validate bookId format
    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid bookId format" });
    }

    // Find the book by ID
    const book = await bookModel.findById(bookId).populate("reviews");

    // Check if the book exists
    if (!book) {
      return res.status(400).send({ status: false, message: "Book not found" });
    }

    // Prepare the response data
    const responseData = {
      _id: book._id,
      title: book.title,
      excerpt: book.excerpt,
      userId: book.userId,
      category: book.category,
      releasedAt: book.releasedAt,
      reviewsData: book.reviews || [],
    };

    return res.status(200).send({ status: true, data: responseData });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// Update Book
const updateBook = async function (req, res) {
  try {
    const bookId = req.params.bookId;
    const { title, excerpt, releasedAt, ISBN } = req.body;

    // Check if the bookId exists and is not deleted
    const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res
        .status(400)
        .json({ status: false, message: "Book not found." });
    }

    // Update the book fields
    book.title = title;
    book.excerpt = excerpt;
    book.releasedAt = releasedAt;
    book.ISBN = ISBN;

    // Validate the updated book fields
    
    
    if (!validator.isValidDate(releasedAt)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid releasedAt date format." });
    }
    if (!validator.isValidISBN(ISBN)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid ISBN format." });
    }

    // Save the updated book
    const updatedBook = await book.save();

    // Return the updated book document
    return res
      .status(200)
      .json({
        status: true,
        message: "Book updated successfully.",
        data: updatedBook,
      });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

// DELETE Books by ID
const deleteBook = async function (req, res) {
    try {
      const bookId = req.params.bookId;
  
      // Check if the bookId exists and is not deleted
      const book = await bookModel.findOne({ _id: bookId, isDeleted: false });
  
      if (!book) {
        return res.status(400).json({ status: false, message: "Book not found" });
      }
  
      // Mark the book as deleted
      book.isDeleted = true;
      book.deletedAt = new Date();
      await book.save();
  
      return res.status(200).json({ status: true, message: "Book deleted successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
  };
  
module.exports = { createBooks, getBooks, getBookById , updateBook, deleteBook};
