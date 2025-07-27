const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: String,
  courses: [
    {
      courseId: String,
      title: String,
      price: Number,
    },
  ],
  amount: Number,
  paymentMethod: String,
  paymentDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
