const mongoose = require('mongoose');

// Define a separate object for common schema properties
const stringRequired = {
  type: String,
  required: true
};

const timetableSchema = new mongoose.Schema({
  branch: stringRequired,
  year: stringRequired,
  monday: {
    "1": stringRequired,
    "2": stringRequired,
    "3": stringRequired,
    "4": stringRequired,
    "5": stringRequired,
    "6": stringRequired
  },
  tuesday: {
    "1": stringRequired,
    "2": stringRequired,
    "3": stringRequired,
    "4": stringRequired,
    "5": stringRequired,
    "6": stringRequired
  },
  wednesday: {
    "1": stringRequired,
    "2": stringRequired,
    "3": stringRequired,
    "4": stringRequired,
    "5": stringRequired,
    "6": stringRequired
  },
  thursday: {
    "1": stringRequired,
    "2": stringRequired,
    "3": stringRequired,
    "4": stringRequired,
    "5": stringRequired,
    "6": stringRequired
  },
  friday: {
    "1": stringRequired,
    "2": stringRequired,
    "3": stringRequired,
    "4": stringRequired,
    "5": stringRequired,
    "6": stringRequired
  },
  saturday: {
    "1": stringRequired,
    "2": stringRequired,
    "3": stringRequired,
    "4": stringRequired,
    "5": stringRequired,
    "6": stringRequired
  }
});

const collections = ['CSM-timetables', 'CSE-timetables', 'EEE-timetables']; 
const models = {};
collections.forEach(collection => {
  models[collection] = mongoose.model(collection, timetableSchema, collection);
});

module.exports = models;