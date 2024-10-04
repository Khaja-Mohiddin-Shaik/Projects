const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentsDetailsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
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
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  phNo: {
    type: Number,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phNo2: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  certificates: {
    type: String,
  },
});

const collections = ['CSM-details', 'CSE-details', 'EEE-details']; 
const models = {};
collections.forEach(collection => {
  models[collection] = mongoose.model(collection, studentsDetailsSchema, collection);
});


module.exports = models;
