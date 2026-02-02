import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, searchQuery, setSearchQuery, onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu for Mobile */}
        <button onClick={onMenuClick} className="md:hidden p-1 text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
        
        {/* Hidden title on mobile, shown on md+ */}
        <div className="hidden md:flex items-center text-gray-600 font-medium">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          {title || 'Dashboard'}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* Responsive Search: Icon only on small screens, full bar on md+ */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-10 md:w-64 focus:w-48 md:focus:w-64 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)} className="w-8 h-8 rounded-full border border-gray-300">
             <img src="https://i.pravatar.cc/150?img=3" alt="User" className="rounded-full" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-50">
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;