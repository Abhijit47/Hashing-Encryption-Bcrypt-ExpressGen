const mongoose = require('mongoose');

const { Schema } = mongoose;

// create a schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name field should not be empty.'],
    minLength: 3,
    maxLength: 255,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'email field should not be empty.'],
    minLength: 15,
    maxLength: 255,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password field should not be empty.'],
    minLength: 6,
    maxLength: 1024,
  },
  created_At: {
    type: Date,
    default: Date.now
  }
});

// middleware

// remove version key in every query
userSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

// create a model
const User = mongoose.model('User', userSchema);
module.exports = User;