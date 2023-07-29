require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");


const MONGODB_URL = process.env.MONGODB_URL;


const User = require('./schemas/schema.js');

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());


app.post('/signup', async (req, res) => {
  const { name, email, password, phoneNumber, age = "20", gender = "male" } = req.body;
  try {
    const user = new User({ name, email, password, phoneNumber, age, gender });
    await user.save();
    res.status(200).json({
      success: true,
      message: "Registration successful!",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Something went wrong."
    });
  }
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
