import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, onTogglePublish }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      {/* Product Image Area */}
      <div className="h-48 bg-gray-50 flex items-center justify-center relative p-4">
        {product.images && product.images[0] ? (
          <img src={product.images[0]} alt={product.productName} className="max-h-full object-contain" />
        ) : (
          <div className="text-gray-300">No Image</div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-800 text-lg mb-4">{product.productName}</h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <div className="flex justify-between"><span>Product Type</span> <span>{product.productType}</span></div>
          <div className="flex justify-between"><span>Quantity Stock</span> <span>{product.quantityStock}</span></div>
          <div className="flex justify-between"><span>MRP</span> <span>₹ {product.mrp}</span></div>
          <div className="flex justify-between"><span>Selling Price</span> <span>₹ {product.sellingPrice}</span></div>
          <div className="flex justify-between"><span>Brand Name</span> <span>{product.brandName}</span></div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-3">
          <button 
            onClick={() => onTogglePublish(product._id)}
            className={`flex-1 py-2 px-4 rounded-lg text-white font-medium text-sm transition ${product.isPublished ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-blue hover:bg-blue-700'}`}
          >
            {product.isPublished ? 'Unpublish' : 'Publish'}
          </button>
          
          <button 
            onClick={() => onEdit(product)}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50"
          >
            Edit
          </button>
          
          <button 
            onClick={() => onDelete(product._id)}
            className="p-2 border border-gray-300 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-200 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;