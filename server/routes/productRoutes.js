const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');

// Get all products
router.get('/', auth, productController.getProducts);

// Create a new product
router.post('/', auth, productController.createProduct);

// --- NEW: Update a product (This fixes the 404 error on Edit/Toggle) ---
router.put('/:id', auth, async (req, res) => {
  try {
    const Product = require('../models/Product'); // Ensure Model is imported
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Delete a product
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;