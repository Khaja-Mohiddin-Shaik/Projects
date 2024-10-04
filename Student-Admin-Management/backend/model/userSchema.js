const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  sem: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema)

// const collections = ['CSM-details', 'CSE-details', 'EEE-details']; 
// const models = {};
// collections.forEach(collection => {
//   models[collection] = mongoose.model(collection, userSchema, collection);
// });


// module.exports = models;
