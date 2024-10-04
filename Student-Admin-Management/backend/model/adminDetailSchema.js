const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminDetailSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    photo: {
      type: String
    },
    phNo: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phNo2: {
      type: Number
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    
  });

module.exports = mongoose.model("Admin-detail", adminDetailSchema);