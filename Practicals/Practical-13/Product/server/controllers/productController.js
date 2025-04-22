// Use either ES module exports (if you're using type: module in package.json)
// Or CommonJS exports (standard Node.js)

// Option 1: CommonJS exports (recommended for Node.js)
const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'No product found'
      });
    }
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Export as an object
module.exports = {
  getProducts,
  getProduct,
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  },
  updateProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'No product found'
        });
      }
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'No product found'
        });
      }
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};