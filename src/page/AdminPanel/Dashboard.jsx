import React, { useState, useEffect } from 'react';
import { getProducts, getUsers, getOrders, getSupports } from '../../api/api';

const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-2xl p-6 flex items-center gap-4`}>
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0, support: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getUsers(), getOrders(), getSupports()])
      .then(([products, users, orders, supports]) => {
        setStats({
          products: products.data.length,
          users: users.data.length,
          orders: orders.data.length,
          support: supports.data.length,
        });
        setOrders(orders.data.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusColors = {
    delivered: 'bg-green-500/20 text-green-400',
    shipped: 'bg-blue-500/20 text-blue-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back! Here's an overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🛍️" label="Total Products" value={loading ? '...' : stats.products} color="bg-orange-500/20" />
        <StatCard icon="👥" label="Total Users" value={loading ? '...' : stats.users} color="bg-blue-500/20" />
        <StatCard icon="📦" label="Total Orders" value={loading ? '...' : stats.orders} color="bg-green-500/20" />
        <StatCard icon="💬" label="Support Tickets" value={loading ? '...' : stats.support} color="bg-purple-500/20" />
      </div>

      {/* Revenue card */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8">
        <p className="text-indigo-100 text-sm mb-1">Total Revenue</p>
        <p className="text-4xl font-extrabold text-white">$12,450.00</p>
        <p className="text-indigo-200 text-sm mt-1">↑ 12% from last month</p>
      </div>

      {/* Recent orders */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-white font-semibold text-lg">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50">
              <tr>
                {['Order ID', 'User ID', 'Product ID', 'Qty', 'Total', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={7} className="px-6 py-4"><div className="h-4 bg-gray-700 rounded animate-pulse" /></td></tr>
                  ))
                : orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-gray-300">#{o.id}</td>
                      <td className="px-6 py-4 text-gray-300">{o.userId}</td>
                      <td className="px-6 py-4 text-gray-300">{o.productId}</td>
                      <td className="px-6 py-4 text-gray-300">{o.quantity}</td>
                      <td className="px-6 py-4 text-orange-400 font-semibold">${o.totalPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || 'bg-gray-600 text-gray-300'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{o.orderDate}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
