const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require("../Controller/userController");
const {createBooks} = require("../Controller/bookController");
// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Register a Book
router.post('/registerBooks', createBooks);

module.exports = router;
