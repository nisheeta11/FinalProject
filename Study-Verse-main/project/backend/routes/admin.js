const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Class = require('../models/Class');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', 'name');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

module.exports = router;
