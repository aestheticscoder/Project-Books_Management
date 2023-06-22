const mongoose = require("mongoose");

// Validation for name
const isValidName = function (name) {
  const nameRegex = /^[a-zA-Z\s\-]{2,50}$/;
  return nameRegex.test(name);
};

// Validation for Phone Number
const isValidMobileNumber = function (phone) {
  const phoneRegex = /^(?!([1-5]))[0-9]{10}$/;
  return phoneRegex.test(phone);
};

//  Validation for Email
const isValidEmail = function (email) {
  const emailRegex =
    /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/;
  return emailRegex.test(email);
};

//  Validation for password
const isValidPassword = function (password) {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  return passwordRegex.test(password);
};

//  Validation for ObjectId
const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId);
}

//  Validation for Date
const isValidDate = function (releasedAt) {
    const dateRegex = /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;
    return dateRegex.test(releasedAt);

}

//  Validation for ISBN
const isValidISBN = function (ISBN) {
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return isbnRegex.test(ISBN);

}

module.exports = {
  isValidName,
  isValidMobileNumber,
  isValidEmail,
  isValidPassword,
  isValidObjectId,
  isValidDate,
  isValidISBN
};
