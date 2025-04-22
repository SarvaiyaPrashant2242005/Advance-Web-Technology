const Item = require('../models/Item');

exports.searchItems = async (req, res) => {
  const { query } = req.query;
  const items = await Item.find({ name: { $regex: query, $options: 'i' } });
  res.json(items);
};
