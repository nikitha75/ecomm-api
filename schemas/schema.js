const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },

  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    default: null,
    required: true,
    min: 10,
  },
  age: {
    type: Number,
    default: null,
    required: true,
    min: 4,
  },
  gender:{
    type:String,
    required: true,
  }

});




const User = mongoose.model('users', userSchema);

module.exports = User;
