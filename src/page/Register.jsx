import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { loginUser: setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match', { theme: 'dark' });
      return;
    }
    setLoading(true);
    try {
      const newUser = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
        createdAt: new Date().toISOString().split('T')[0],
        token: `usr_${Date.now()}`,
      };
      const res = await createUser(newUser);
      setUser(res.data);
      toast.success('Account created! Welcome 🎉', { theme: 'dark' });
      navigate('/');
    } catch {
      toast.error('Registration failed. Try again.', { theme: 'dark' });
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
        <div className="text-center mb-8">
          <span className="text-5xl">🛍️</span>
          <h1 className="text-2xl font-bold text-white mt-3">Create an Account</h1>
          <p className="text-gray-400 text-sm mt-1">Join ShopMaster today</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-gray-400 text-sm mb-1.5 block">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm transition-colors"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
