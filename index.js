const express = require('express');
const mongoose = require('mongoose');


const DatabaseUrl = 'mongodb+srv://adityashivhare7291:9981142668@cluster0.nf2t6aw.mongodb.net/sringar'; // Replace 'my_database' with your database name
const app=Express();

const User = require('schema.js');

mongoose.connect(DatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

app.post('http://localhost:3000/signup', (req, res) => {
  const infos = req.body;

  // Validate request data against the schema
  const newUser = new User(infos);

  newUser.save((err, savedUser) => {
    if (err) {
      console.error('Error saving user:', err);
      return res.status(400).json({ error: 'Invalid data' });
    }
    console.log('User saved successfully:', savedUser);
    return res.status(201).json(savedUser);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



