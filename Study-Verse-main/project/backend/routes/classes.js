const express = require('express');
const router = express.Router();
const Class = require('../models/Class');


router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ error: 'Failed to schedule class' });
  }
});


router.get('/', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', 'name');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

module.exports = router;
