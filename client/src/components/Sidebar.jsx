import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assest } from '../assets/img';


const HomeIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);
const ProductIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path 
    ? "text-brand-orange border-r-4 border-brand-orange bg-white/5" 
    : "text-gray-400 hover:text-white";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div className={`
        w-64 bg-sidebar-dark h-screen fixed left-0 top-0 flex flex-col text-white z-50 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-700 font-bold text-2xl">
          <span className='flex gap-2 items-center'>Productr <img className='size-6' src={assest.Vector} alt="" /></span>
          {/* Close button for mobile */}
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <nav className="mt-6 flex-1">
          <Link 
            to="/products" 
            onClick={() => setIsOpen(false)} // Close on navigate
            className={`flex items-center px-6 py-4 transition-colors ${isActive('/products')}`}
          >
            <ProductIcon /> Products
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;