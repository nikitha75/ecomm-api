const express = require('express');
const mongoose = require('mongoose');

const DatabaseUrl = 'mongodb+srv://adityashivhare7291:9981142668@cluster0.nf2t6aw.mongodb.net/sringar';
const app = express();

app.use(express.json());
// Import the User schema using the correct relative path
const User = require('./schemas/schema'); // Replace './schema' with the actual relative path to your 'schema.js' file

mongoose.connect(DatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// You should use 'User' instead of 'Person'


// Move the newPerson.save() block inside the app.post() route handler
app.post('/signup', async(req, res) => {
  const infos = req.body;

  // Validate request data against the schema
  const newUser = new User(infos);

  const result=await newUser.save((err, savedUser) => {
    if (err) {
      console.error('Error saving user:', err);
      return res.status(400).json({ error: 'Invalid data' });
    }
    console.log('User saved successfully:', savedUser);
    return res.status(201).json(savedUser);
  });
});

const port = 3000; // Set the port for your server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
