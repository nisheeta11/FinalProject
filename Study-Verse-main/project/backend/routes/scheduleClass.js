const express = require('express');
const router = express.Router();
const Class = require('../models/Class'); 

router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error saving class:', error);
    res.status(500).json({ message: 'Server error scheduling class' });
  }
});

router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', 'name email');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes' });
  }
});

module.exports = router;
