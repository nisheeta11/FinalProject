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
    const courses = await Course.find().populate('uploadedBy', '_id name email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', '_id name email');
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

module.exports = router;
