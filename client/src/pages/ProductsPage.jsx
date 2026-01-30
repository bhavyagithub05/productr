import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModel';
import api from '../services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Published'); // 'Published' or 'Unpublished'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Products on Load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter Products based on Tab
  const filteredProducts = products.filter(p => {
      const isCorrectTab = activeTab === 'Published' ? p.isPublished : !p.isPublished
      const matchesSearch = p.productName.toLowerCase().includes(searchQuery.toLowerCase());
      return isCorrectTab && matchesSearch;
    }
  );

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  //HandleEdit
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };


  // Handle Publish Toggle
  const handleTogglePublish = async (id) => {
    const product = products.find(p => p._id === id);
    try {
      const updatedProduct = { ...product, isPublished: !product.isPublished };
      // Optimistic UI Update
      setProducts(products.map(p => p._id === id ? updatedProduct : p));
      // API Update
      await api.put(`/products/${id}`, updatedProduct);
    } catch (err) {
      console.error("Failed to update status", err);
      fetchProducts(); // Revert on error
    }
  };

  return (
    <div className="flex h-screen bg-bg-light font-sans">
      {/* 1. Left Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        <Header title="Products" searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

        {/* Page Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          
          {/* Top Bar: Tabs & Add Button */}
          <div className="flex justify-between items-center mb-8">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-200 w-full max-w-md">
              <button 
                onClick={() => setActiveTab('Published')}
                className={`pb-3 px-1 text-sm font-medium transition-all ${
                  activeTab === 'Published' 
                    ? 'border-b-2 border-brand-blue text-brand-blue' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Published
              </button>
              <button 
                onClick={() => setActiveTab('Unpublished')}
                className={`pb-3 px-1 text-sm font-medium transition-all ${
                  activeTab === 'Unpublished' 
                    ? 'border-b-2 border-brand-blue text-brand-blue' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Unpublished
              </button>
            </div>

            {/* Add Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-blue font-medium transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Add Products
            </button>
          </div>

          {/* Product Grid or Empty State */}
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onDelete={handleDelete}
                  onTogglePublish={handleTogglePublish}
                  onEdit={handleEdit} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-brand-blue">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                 <span className="absolute ml-8 mt-8 text-2xl font-bold">+</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {activeTab === 'Published' ? 'No Published Products' : 'No Unpublished Products'}
              </h3>
              <p className="text-gray-500 max-w-sm mb-8">
                Your {activeTab} Products will appear here. <br/>
                Create your first product to publish.
              </p>
              
              {/* Only show button if tab is Empty */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-brand-blue text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-800 transition"
              >
                Add your Products
              </button>
            </div>
          )}

        </div>
      </div>

      {/* The Modal Component */}
      <AddProductModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onProductAdded={fetchProducts}
        editData={editingProduct}
      />
    </div>
  );
};

export default ProductsPage;