import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { assest } from '../assets/img';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex h-screen w-full bg-bg-light">
      {/* 1. Left Sidebar - Stays hidden on mobile, flex on desktop */}
      <div className="hidden md:flex w-1/2 bg-sidebar-dark items-center justify-center">
         <h1 className="flex gap-2 items-center text-white text-5xl font-bold">
           Productr <img className='size-10' src={assest.Vector} alt="logo" />
         </h1>
      </div>

      {/* 2. Main Form Area - Responsive Padding */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8">
        <div className="w-full max-w-md space-y-8">
          
          {/* Mobile-Only Header: Shown only on small screens */}
          <div className="flex md:hidden flex-col items-center gap-2 mb-4">
            <h1 className="flex gap-2 items-center text-sidebar-dark text-4xl font-bold">
              Productr <img className='size-8' src={assest.Vector} alt="logo" />
            </h1>
            <p className="text-gray-500 text-sm">Join the marketplace today</p>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none transition-all" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
              <input 
                type="email" 
                placeholder="Email" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none transition-all" 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none transition-all" 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-brand-blue text-white rounded-lg font-bold hover:bg-blue-900 transition-all active:scale-[0.98] shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center">
            Already have an account? <Link to="/login" className="text-brand-blue font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;