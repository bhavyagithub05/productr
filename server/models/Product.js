const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  productName: { type: String, required: true },
  productType: { type: String },
  quantityStock: { type: Number, required: true },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  brandName: { type: String, required: true },
  images: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  exchangeEligibility: { type: String, default: 'Yes' }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);