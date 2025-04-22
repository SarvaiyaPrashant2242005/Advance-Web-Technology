const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  totalAmount: Number,
  paymentMethod: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);
