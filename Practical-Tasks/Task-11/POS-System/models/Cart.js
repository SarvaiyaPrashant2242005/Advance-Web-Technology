const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: String,
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  name: String,
  price: Number,
  quantity: Number,
  total: Number,
});

module.exports = mongoose.model('Cart', cartSchema);
