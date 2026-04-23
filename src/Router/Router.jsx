import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Shop layout wrapper
import Navbar from '../components/Navbar';
import Footer from '../components/Fotter';

// Admin layout wrapper
import SideBar from '../components/SaidBar';

// Shop pages
import Home from '../page/Ui/Home';
import ShopProducts from '../page/Ui/Products';
import Basket from '../page/Ui/Basket';
import Support from '../page/Ui/Support';
import About from '../page/Ui/About';
import Profile from '../page/Ui/Profile';
import NotFound from '../page/Ui/Goot';

// Auth pages
import Login from '../page/Login';
import Register from '../page/Register';

// Admin pages
import Dashboard from '../page/AdminPanel/Dashboard';
import AdminProducts from '../page/AdminPanel/Products';
import AdminUsers from '../page/AdminPanel/AdminUsers';
import Users from '../page/AdminPanel/Users';
import SelledProducts from '../page/AdminPanel/SelledProducts';
import Supports from '../page/AdminPanel/Supports';

// Shop layout
const ShopLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-950">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

// Admin layout
const AdminLayout = ({ children }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/login" replace />;
  return (
    <div className="flex min-h-screen bg-gray-950">
      <SideBar />
      <main className="flex-1 overflow-auto text-white">{children}</main>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Shop routes */}
      <Route path="/" element={<ShopLayout><Home /></ShopLayout>} />
      <Route path="/products" element={<ShopLayout><ShopProducts /></ShopLayout>} />
      <Route path="/basket" element={<ShopLayout><Basket /></ShopLayout>} />
      <Route path="/support" element={<ShopLayout><Support /></ShopLayout>} />
      <Route path="/about" element={<ShopLayout><About /></ShopLayout>} />
      <Route path="/profile" element={<ShopLayout><Profile /></ShopLayout>} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
      <Route path="/admin/users" element={<AdminLayout><Users /></AdminLayout>} />
      <Route path="/admin/admin-users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
      <Route path="/admin/orders" element={<AdminLayout><SelledProducts /></AdminLayout>} />
      <Route path="/admin/supports" element={<AdminLayout><Supports /></AdminLayout>} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
