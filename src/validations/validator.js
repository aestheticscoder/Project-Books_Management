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

module.exports = {
  isValidName,
  isValidMobileNumber,
  isValidEmail,
  isValidPassword,
};
