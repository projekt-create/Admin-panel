import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: '📊', end: true },
  { label: 'Products', path: '/admin/products', icon: '🛍️' },
  { label: 'Users', path: '/admin/users', icon: '👥' },
  { label: 'Admin Users', path: '/admin/admin-users', icon: '🛡️' },
  { label: 'Orders', path: '/admin/orders', icon: '📦' },
  { label: 'Support', path: '/admin/supports', icon: '💬' },
];

const SideBar = () => {
  const { adminUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛍️</span>
          <div>
            <p className="text-white font-bold text-lg leading-tight">ShopMaster</p>
            <p className="text-orange-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Admin info */}
      {adminUser && (
        <div className="p-4 mx-3 mt-4 bg-gray-800 rounded-xl flex items-center gap-3">
          <img src={adminUser.avatar} alt="admin" className="w-10 h-10 rounded-full border-2 border-orange-400" />
          <div className="overflow-hidden">
            <p className="text-white text-sm font-medium truncate">{adminUser.name}</p>
            <p className="text-orange-400 text-xs capitalize">{adminUser.role}</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3 px-2">Navigation</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={linkClass}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-gray-700 hover:text-white transition-all"
        >
          <span>🌐</span> View Shop
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
