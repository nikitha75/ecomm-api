const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");


const DatabaseUrl = 'mongodb+srv://adityashivhare7291:9981142668@cluster0.nf2t6aw.mongodb.net/sringar';



const User = require('./schemas/schema.js');

mongoose.connect(DatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});


app.use(express.json());

// app.use(bodyParser.json());

app.use(cors());



// app.post('http://localhost:5000/signup', (req, res) => {

app.post('/signup', async(req, res) => {
  // const infos = req.body;

  // Validate request data against the schema
  // const newUser = new User(infos);

  const { name, email, password, phoneNumber, gender } = req.body;

  const newUser = new User({ name, email, password, phoneNumber, gender });

  const result = await newUser.save((err, savedUser) => {
    if (err) {
      console.error('Error saving user:', err);
      return res.status(400).json({ error: 'Invalid data' });
    }
    console.log('User saved successfully:', savedUser);
    return res.status(201).json(savedUser);
  });
});


const PORT =  5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



