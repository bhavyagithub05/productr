import React, { useEffect,useState } from 'react';
import api from '../services/api';

const AddProductModal = ({ isOpen, onClose, onProductAdded, editData }) => {
  // --- 1. HOOKS ALWAYS COME FIRST ---
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    quantityStock: '',
    mrp: '',
    sellingPrice: '',
    brandName: '',
    images: [], 
    exchangeEligibility: 'Yes',
    isPublished: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- NEW: Fill form if we are EDITING ---
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        productName: '', productType: '', quantityStock: '', 
        mrp: '', sellingPrice: '', brandName: '', 
        images: [], exchangeEligibility: 'Yes', isPublished: true
      });
    }
  }, [editData, isOpen]);

  // --- 2. HELPER FUNCTIONS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editData) {
        // UPDATE EXISTING PRODUCT (PUT)
        await api.put(`/products/${editData._id}`, formData);
      } else {
        // CREATE NEW PRODUCT (POST)
        await api.post('/products', formData);
      }
      
      onProductAdded(); 
      onClose(); 
    } catch (err) {
      console.error(err);
      setError('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Add Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input 
              type="text" 
              name="productName"
              value={formData.productName} 
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition"
              placeholder="e.g. CakeZone Walnut Brownie"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
            <div className="relative">
              <select 
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none bg-white focus:ring-2 focus:ring-brand-blue outline-none text-gray-600"
              >
                <option value="" disabled>Select product type</option>
                <option value="Foods">Foods</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes">Clothes</option>
                <option value="Beauty Products">Beauty Products</option>
                <option value="Others">Others</option>
              </select>
              <div className="absolute right-4 top-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Stock</label>
            <input 
              type="number" 
              name="quantityStock"
              value={formData.quantityStock}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="Total numbers of Stock available"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">MRP</label>
            <input 
              type="number" 
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="Total numbers of Stock available"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
            <input 
              type="number" 
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="Total numbers of Stock available"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
            <input 
              type="text" 
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
              placeholder="Total numbers of Stock available"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Product Images</label>
            
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-gray-500">Enter Description</p>
                <p className="text-sm font-bold text-gray-900">Browse</p>
              </div>
              <input type="file" className="hidden" multiple onChange={handleImageChange} />
            </label>

            {formData.images.length > 0 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative w-16 h-16 border rounded-lg overflow-hidden shrink-0">
                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-white rounded-bl-lg p-0.5 text-red-500 shadow-sm"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exchange or return eligibility</label>
            <div className="relative">
              <select 
                name="exchangeEligibility"
                value={formData.exchangeEligibility}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none bg-white focus:ring-2 focus:ring-brand-blue outline-none text-gray-600"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div className="absolute right-4 top-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-brand-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition disabled:bg-blue-300 w-full sm:w-auto"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;