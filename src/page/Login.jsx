import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, loginAdmin } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser: setUser, loginAdmin: setAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Try user first
      const userRes = await loginUser(form.email, form.password);
      if (userRes.data.length > 0) {
        setUser(userRes.data[0]);
        toast.success(`Welcome back, ${userRes.data[0].name}! 🎉`, { theme: 'dark' });
        navigate('/');
        return;
      }
      // Try admin
      const adminRes = await loginAdmin(form.email, form.password);
      if (adminRes.data.length > 0) {
        setAdmin(adminRes.data[0]);
        toast.success(`Welcome back, ${adminRes.data[0].name}! 🛡️`, { theme: 'dark' });
        navigate('/admin');
        return;
      }
      toast.error('Invalid email or password', { theme: 'dark' });
    } catch {
      toast.error('Login failed. Try again.', { theme: 'dark' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 pt-12">
      <div className="w-full max-w-md">
        <Link to="/" className="text-gray-400 hover:text-indigo-400 flex items-center gap-2 mb-6 transition-colors w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Home
        </Link>
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🛍️</span>
          <h1 className="text-2xl font-bold text-white mt-3">
            Welcome to <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">ShopMaster</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Hint */}
          <div className="mt-4 bg-gray-700/50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Demo credentials:</p>
            <p className="text-xs text-gray-400">User: <span className="text-indigo-400">user.jane@example.com</span> / userPass123</p>
            <p className="text-xs text-gray-400">Admin: <span className="text-indigo-400">admin.john@shopmaster.com</span> / adminPass123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
