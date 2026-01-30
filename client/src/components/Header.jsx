import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, searchQuery, setSearchQuery }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the session
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="text-gray-600 font-medium">
        <svg className="w-4 h-4 inline mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        {title || 'Dashboard'}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search Services, Products" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        {/* User Profile Avatar with Logout Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden border border-gray-300 focus:outline-none cursor-pointer"
          >
             <img src="https://i.pravatar.cc/150?img=3" alt="User" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;