const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

router.post('/submit', async (req, res) => {
  const { category, answers, score, user } = req.body;

  if (!category || !answers || score === undefined || !user) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log(`Quiz submitted by: ${user}`);
    const newResult = new QuizResult({ category, answers, score, user });
    await newResult.save();
    res.status(201).json({ message: 'Quiz result saved successfully' });
  } catch (error) {
    console.error('Quiz submission failed:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
