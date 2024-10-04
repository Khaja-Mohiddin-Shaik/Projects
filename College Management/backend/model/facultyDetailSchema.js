const mongoose = require('mongoose');

// Schema for faculty details
const facultyDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  phNo: {
    type: Number,
    required: true
  }
});

// Main schema for the timetable or class details
const classDetailsSchema = new mongoose.Schema({
  branch: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  facultyDetails: [facultyDetailSchema] 
});

const collections = ['CSM-faculties', 'CSE-faculties', 'EEE-faculties']; 
const models = {};
collections.forEach(collection => {
  models[collection] = mongoose.model(collection, classDetailsSchema, collection);
});

module.exports = models;


