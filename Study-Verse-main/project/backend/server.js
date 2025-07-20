require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const purchaseRoutes = require('./routes/PurchaseRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const transactionRoutes = require('./routes/transaction');
const scheduleRoutes = require('./routes/scheduleClass');
const adminRoutes = require('./routes/admin');
const quizResultRoutes = require('./routes/quizResults');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/classes', scheduleRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/quiz', quizResultRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
