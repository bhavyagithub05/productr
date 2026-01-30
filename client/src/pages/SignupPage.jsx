import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

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
      <div className="hidden md:flex w-1/2 bg-sidebar-dark items-center justify-center">
         <h1 className="text-white text-5xl font-bold">Productr <span className="text-brand-orange">CO</span></h1>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input type="text" placeholder="Full Name" required className="w-full px-4 py-3 rounded-lg border border-gray-300" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-lg border border-gray-300" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Password" required className="w-full px-4 py-3 rounded-lg border border-gray-300" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit" className="w-full py-3 bg-brand-blue text-white rounded-lg font-bold">Sign Up</button>
          </form>
          <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-brand-blue font-bold">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;