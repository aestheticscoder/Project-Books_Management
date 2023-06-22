const userModel = require("../Models/userModel");
const validator = require("../validations/validator");

// Register User
const registerUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, message: "Please provide some Data" });
    }
    const { title, name, phone, email, password, address } = data;
    if (!title) {
      return res.status(400).send({ status: false, message: "Please provide Title" });
    }
    if (title == "Mr" || title == "Mrs" || title == "Miss") {
      if (!validator.isValidName(name)) {
        return res.status(400).send({ status: false, message: "Invalid Name Format" });
      }

      if (!phone) {
        return res.status(400).send({ status: false, message: "Please provide Phone Number" });
      }
      if (!validator.isValidMobileNumber(phone)) {
        return res.status(400).send({ status: false, message: "Invalid Phone Number" });
      }
      const isMobileNumberAlreadyUsed = await userModel.findOne({ phone });
      if (isMobileNumberAlreadyUsed) {
        return res.status(400).send({ status: false, message: "Phone Number Already in Use" });
      }
      if (!email) {
        return res.status(400).send({ status: false, message: "Please Provide E-mail" });
      }
      if (!validator.isValidEmail(email)) {
        return res.status(400).send({ status: false, message: "Invalid E-mail Format" });
      }
      const isEmailAlreadyUsed = await userModel.findOne({ email });
      if (isEmailAlreadyUsed) {
        return res.status(400).send({ status: false, message: "E-mail is Already Used" });
      }
      if (!password) {
        return res.status(400).send({ status: false, message: "Please Provide Password" });
      }
      if (!validator.isValidPassword(password)) {
        return res.status(400).send({ status: false, message: "Invalid password Format / Please fill the password in-between 8-15 words" });
      }

      // Create an instance of the userModel and saving it
      let newUser = new userModel(data);
      let userData = await newUser.save();

      return res.status(201).send({ status: true, message: "User Registered Successfully", data: userData });
    } else {
      return res.status(400).send({ status: false, message: "Title should be correct" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { registerUser };
