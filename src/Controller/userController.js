const userModel = require("../Models/userModel");
const validator = require("../validations/validator");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide some Data" });
    }
    const { title, name, phone, email, password, address } = data;
    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide Title" });
    }
    if (title == "Mr" || title == "Mrs" || title == "Miss") {
      if (!validator.isValidName(name)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid Name Format" });
      }

      if (!phone) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide Phone Number" });
      }
      if (!validator.isValidMobileNumber(phone)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid Phone Number" });
      }
      const isMobileNumberAlreadyUsed = await userModel.findOne({ phone });
      if (isMobileNumberAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: "Phone Number Already in Use" });
      }
      if (!email) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide E-mail" });
      }
      if (!validator.isValidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid E-mail Format" });
      }
      const isEmailAlreadyUsed = await userModel.findOne({ email });
      if (isEmailAlreadyUsed) {
        return res
          .status(400)
          .send({ status: false, message: "E-mail is Already Used" });
      }
      if (!password) {
        return res
          .status(400)
          .send({ status: false, message: "Please Provide Password" });
      }
      if (!validator.isValidPassword(password)) {
        return res
          .status(400)
          .send({
            status: false,
            message:
              "Invalid password Format / Please fill the password in-between 8-15 words",
          });
      }

      // Create an instance of the userModel and saving it
      let newUser = new userModel(data);
      let userData = await newUser.save();

      return res
        .status(201)
        .send({
          status: true,
          message: "User Registered Successfully",
          data: userData,
        });
    } else {
      return res
        .status(400)
        .send({ status: false, message: "Title should be correct" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// Login User
const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide some Input" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide E-mail" });
    }
    if (!validator.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid E-mail Format" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Please Provide Password" });
    }
    if (!validator.isValidPassword(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Not a Valid Password" });
    }
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res
        .status(401)
        .send({ status: false, message: "No User with this E-mail Exists" });
    }
    const verifyUser = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!verifyUser) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Login Credentials" });
    }
    let payload = { userId: findUser._id, iat: Date.now() };
    const token = jwt.sign(payload, "IndividualProject", {
      expiresIn: "1h",
    });
    res.setHeader("x-api-key", token);
    res
      .status(200)
      .send({ status: true, message: "Login Successful", data: { token } });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { registerUser, loginUser };
