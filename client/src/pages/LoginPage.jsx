import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {assest} from '../assets/img'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added for authentication
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Save token
      navigate('/products'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.msg || 'Login Failed');
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Side - Image/Art */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative overflow-hidden">
        {/* Abstract shapes / Image placeholder from your design */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-orange-100 opacity-50"><img src={assest.image1}/></div>
        <div className="relative z-10 bg-gradient-to-b from-orange-400 to-orange-600 rounded-3xl p-1 shadow-2xl max-w-sm">
           <img 
             src={assest.image2} 
             alt="Login Visual" 
             className="rounded-2xl object-cover h-96 w-72 mix-blend-overlay opacity-80"
           />
           <div className="absolute bottom-8 left-0 right-0 text-center text-white font-bold text-xl drop-shadow-md">
             Uplist your <br/> product to market
           </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-light">
        <div className="w-full max-w-md space-y-8">
          
          <h2 className="text-3xl font-bold text-gray-900 text-left">
            Login to your Productr Account
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="name@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-brand-blue text-white font-medium rounded-lg hover:bg-blue-900 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center border-2 border-dashed border-gray-200 rounded-lg py-4">
            <p className="text-sm text-gray-600">
              Don't have a Productr Account? <br/>
              <Link to="/signup" className="text-brand-blue font-semibold cursor-pointer hover:underline">
                SignUp Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;