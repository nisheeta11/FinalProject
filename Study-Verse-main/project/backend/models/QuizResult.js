const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  category: { type: String, required: true },
  answers: { type: Object, required: true },
  score: { type: Number, required: true },
  user: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
