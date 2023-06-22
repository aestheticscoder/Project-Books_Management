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
    return res
      .status(201)
      .send({
        status: true,
        message: "Your Book has been Saved",
        data: saveBook,
      });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createBooks };
