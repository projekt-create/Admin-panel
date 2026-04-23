import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, adminUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-orange-400 font-semibold border-b-2 border-orange-400 pb-0.5'
      : 'text-gray-300 hover:text-orange-400 transition-colors duration-200';

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              ShopMaster
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/products" className={linkClass}>Products</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/support" className={linkClass}>Support</NavLink>
            {(adminUser) && (
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/basket" className="relative p-2 text-gray-300 hover:text-orange-400 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Button */}
            {user || adminUser ? (
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <img
                    src={(user || adminUser).avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-transparent hover:border-indigo-400 transition-colors"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors ml-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            )}

            {/* Mobile menu btn */}
            <button
              className="md:hidden text-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 flex flex-col gap-4">
            <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" className={linkClass} onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/support" className={linkClass} onClick={() => setMenuOpen(false)}>Support</NavLink>
            {adminUser && <NavLink to="/admin" className={linkClass} onClick={() => setMenuOpen(false)}>Admin</NavLink>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
