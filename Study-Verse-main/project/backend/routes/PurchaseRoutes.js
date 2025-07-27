const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase'); 

router.post('/save', async (req, res) => {
  console.log('Purchase save request body:', req.body);
  try {
    const { userId, email, courses, amount, paymentMethod, paymentDate } = req.body;

    if (!userId || !courses || courses.length === 0) {
      return res.status(400).json({ error: 'Missing required purchase info' });
    }

    const newPurchase = new Purchase({
      userId,
      email,
      courses,
      amount,
      paymentMethod,
      paymentDate,
    });

    await newPurchase.save();
    res.status(201).json({ message: 'Purchase saved successfully' });
  } catch (error) {
    console.error('Save purchase error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/mycourses', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId query param is required' });

    const purchases = await Purchase.find({ userId });
    const courses = purchases.flatMap(purchase => purchase.courses || []);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
