const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Course = require('../models/Course');

router.post('/', async (req, res) => {
  try {
    const { title, description, price, image, language, author, uploadedBy } = req.body;

 
    if (!title || !description || !price || !image || !language || !author || !uploadedBy) {
      return res.status(400).json({ error: 'All fields including uploadedBy are required' });
    }

  
    if (!mongoose.Types.ObjectId.isValid(uploadedBy)) {
      return res.status(400).json({ error: 'Invalid uploadedBy user ID' });
    }

    const newCourse = new Course({ title, description, price, image, language, author, uploadedBy });
    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error saving course:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('uploadedBy', 'name email'); 
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

module.exports = router;
