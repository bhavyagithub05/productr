const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      user: req.user.id
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await product.deleteOne();
    res.json({ msg: 'Product removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};