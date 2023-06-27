const express = require('express');
const app = express();
const mongoose = require('mongoose');
const validator = require('validator');
const route = require("./routes/route");
const router = express.Router();
const dotenv = require('dotenv').config();
const {mogoUrl, PORT}= process.env
const multer= require("multer");
const { AppConfig } = require('aws-sdk');

app.use(express.json());

app.use( multer().any())



mongoose.connect(mogoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB is Connected"))
.catch((err) => console.log(err));

app.use('/', route);


app.listen(PORT, () => {
    console.log(`Express app is running on PORT ${PORT}`);
});
