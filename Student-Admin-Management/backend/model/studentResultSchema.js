const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    grade: { type: String, required: true },
    gradePoints: { type: Number, required: true },
    credits: { type: Number, required: true },
    status: { type: String, required: true }
});

const resultSchema = new mongoose.Schema({
    year: { type: String, required: true },
    sem: { type: String, required: true },
    subjects: [subjectSchema],
    marks: {
        totalCredits: { type: Number },
        sgpa: { type: Number }
    }
});

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    results: [resultSchema]
});

const collections = ['CSM-results', 'CSE-results', 'EEE-results']; 
const models = {};
collections.forEach(collection => {
  models[collection] = mongoose.model(collection, studentSchema, collection);
});

module.exports = models;
