const Cart = require('../models/Cart');
const Bill = require('../models/Bill');
const Item = require('../models/Item');

exports.createBill = async (req, res) => {
  const { userId, paymentMethod } = req.body;
  const cartItems = await Cart.find({ userId });

  let totalAmount = 0;
  cartItems.forEach(item => {
    totalAmount += item.total;
  });

  const bill = await Bill.create({
    userId,
    items: cartItems,
    totalAmount,
    paymentMethod,
    status: 'Paid'
  });

  // Reduce stock
  for (const cartItem of cartItems) {
    await Item.findByIdAndUpdate(cartItem.item, { $inc: { stock: -cartItem.quantity } });
  }

  // Clear cart
  await Cart.deleteMany({ userId });

  res.json({ message: 'Bill generated', bill });
};
