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
    <div className="flex h-screen w-full bg-white relative overflow-hidden">
      
      {/* 1. The Background Gradient (Now visible on Mobile too) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#010860,#002283,#734AA3,#E7959C,#E4A182,#BF3613)] opacity-50 md:hidden"></div>

      {/* 2. Left Side - Image/Art (Remains Desktop Only) */}
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#010860,#002283,#734AA3,#E7959C,#E4A182,#BF3613)] opacity-70">
          <img src={assest.image1} className="w-full h-full object-cover mix-blend-overlay"/>
        </div>
        <div className='flex gap-2 items-center absolute top-4 left-5 font-bold text-[#071074]'>
          Productr
          <img className='size-5' src={assest.Vector} alt='logo'/>
        </div>
        <div className="relative z-10 rounded-3xl p-1 shadow-2xl max-w-sm">
           <img src={assest.image2} alt="Login Visual" className="rounded-2xl object-cover h-96 w-72" />
           <div className="absolute bottom-8 left-0 right-0 text-center text-white font-bold text-xl drop-shadow-md">
             Uplist your <br/> product to market
           </div>
        </div>
      </div>

      {/* 3. Right Side - Form (Enhanced for Mobile) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 z-20">
        <div className="w-full max-w-md space-y-8 bg-white/80 md:bg-transparent p-6 rounded-2xl backdrop-blur-sm md:backdrop-blur-0 shadow-xl md:shadow-none">
          
          {/* Mobile-Only Logo */}
          <div className='flex md:hidden gap-2 items-center justify-center font-bold text-2xl text-brand-blue mb-4'>
            Productr
            <img className='size-6' src={assest.Vector} alt='logo'/>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
            Login to your Productr Account
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && <p className="text-red-500 text-sm text-center md:text-left">{error}</p>}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-900 transition-all shadow-md active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center border-2 border-dashed border-gray-200 rounded-lg py-4 bg-gray-50/50">
            <p className="text-sm text-gray-600">
              Don't have a Productr Account? <br/>
              <Link to="/signup" className="text-brand-blue font-bold cursor-pointer hover:underline">
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