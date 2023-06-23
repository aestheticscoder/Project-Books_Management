const express = require('express');
const app = express();
const mongoose = require('mongoose');
const validator = require('validator');
const route = require("./routes/route");
const router = express.Router();
const dotenv = require('dotenv').config();

app.use(express.json());

const url = "mongodb+srv://believe0256:CPuySYUcHa0f9Rad@book-management.vfnphfk.mongodb.net/Book-Management-Db";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB is Connected"))
.catch((err) => console.log(err));

app.use('/', route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Express app is running on PORT ${port}`);
});
