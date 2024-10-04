const mongoose = require('mongoose');
const { Schema } = mongoose;

const feeItemSchema = new Schema({
  sNo: { type: Number, required: true },
  feeType: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true }
});
const feeSchema = new Schema({
  userId: { type: String, required: true },
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
  "I-I": [feeItemSchema],
  "I-II": [feeItemSchema],
  "II-I": [feeItemSchema],
  "II-II": [feeItemSchema],
  "III-I": [feeItemSchema],
  "III-II": [feeItemSchema],
  "IV-I": [feeItemSchema],
  "IV-II": [feeItemSchema]
}, { timestamps: true });

const collections = ['CSM-fees', 'CSE-fees', 'EEE-fees']; 
const models = {};
collections.forEach(collection => {
  models[collection] = mongoose.model(collection, feeSchema, collection);
});


module.exports = models;
