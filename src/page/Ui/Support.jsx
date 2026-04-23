import React, { useState } from 'react';
import { createSupport } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Support = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setLoading(true);
    try {
      await createSupport({
        userId: user?.id || 0,
        message: form.message,
        date: new Date().toISOString().split('T')[0],
      });
      toast.success('Message sent! We\'ll get back to you soon 📩', { theme: 'dark' });
      setForm({ message: '' });
    } catch {
      toast.error('Failed to send message', { theme: 'dark' });
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express options are available at checkout.' },
    { q: 'Can I return a product?', a: 'Yes! We offer 30-day hassle-free returns for all products in original condition.' },
    { q: 'Do you offer discounts?', a: 'We regularly run promotions. Sign up for our newsletter to get 10% off your first order.' },
    { q: 'How do I track my order?', a: 'Once shipped, you\'ll receive a tracking link via email to monitor your delivery.' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold">Support Center</h1>
          <p className="text-gray-400 mt-1">We're here to help you 24/7</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Your Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    placeholder="Login to autofill"
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    placeholder="Login to autofill"
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-gray-300 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Message <span className="text-red-400">*</span></label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ message: e.target.value })}
                    placeholder="Describe your issue or question..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-orange-500 resize-none placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  {loading ? 'Sending...' : 'Send Message 📩'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { icon: '📞', label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: '📧', label: 'Email', value: 'hello@pizzashop.com' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sun 10am–11pm' },
                { icon: '📍', label: 'Address', value: '123 Pizza Street, NY' },
              ].map((c) => (
                <div key={c.label} className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <p className="text-2xl mb-1">{c.icon}</p>
                  <p className="text-gray-500 text-xs">{c.label}</p>
                  <p className="text-white text-sm font-medium">{c.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-gray-800 border border-gray-700 rounded-2xl group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-medium select-none">
                    {faq.q}
                    <span className="text-orange-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                  </summary>
                  <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
