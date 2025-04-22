const Cart = require('../models/Cart'); // make sure you have this model

const addToCart = async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const newCartItem = new Cart({ userId, itemId, quantity });
    await newCartItem.save();
    res.status(201).json({ message: 'Item added to cart', item: newCartItem });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item to cart', error: err });
  }
};

module.exports = { addToCart };
