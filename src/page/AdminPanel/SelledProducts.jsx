import React, { useState, useEffect } from 'react';
import { getOrders, updateOrder, deleteOrder } from '../../api/api';
import { toast } from 'react-toastify';

const statuses = ['pending', 'shipped', 'delivered', 'cancelled'];
const statusColors = {
  delivered: 'bg-green-500/20 text-green-400',
  shipped: 'bg-blue-500/20 text-blue-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  cancelled: 'bg-red-500/20 text-red-400',
};

const SelledProducts = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    getOrders().then((res) => setOrders(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (order, newStatus) => {
    try {
      await updateOrder(order.id, { ...order, status: newStatus });
      toast.success('Order status updated!', { theme: 'dark' });
      load();
    } catch {
      toast.error('Failed to update status', { theme: 'dark' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order?')) return;
    try {
      await deleteOrder(id);
      toast.success('Order deleted', { theme: 'dark' });
      load();
    } catch {
      toast.error('Failed to delete', { theme: 'dark' });
    }
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const total = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-gray-400 text-sm mt-1">{orders.length} total orders · Revenue: <span className="text-orange-400">${total.toFixed(2)}</span></p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...statuses].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
              filter === s ? 'bg-orange-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-700/50">
              <tr>
                {['Order ID', 'User', 'Product', 'Qty', 'Total', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-gray-400 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading
                ? [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={8} className="px-6 py-4"><div className="h-10 bg-gray-700 rounded animate-pulse" /></td></tr>
                  ))
                : filtered.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 text-gray-300 font-medium">#{o.id}</td>
                      <td className="px-6 py-4 text-gray-300">User #{o.userId}</td>
                      <td className="px-6 py-4 text-gray-300">Product #{o.productId}</td>
                      <td className="px-6 py-4 text-gray-300">{o.quantity}</td>
                      <td className="px-6 py-4 text-orange-400 font-semibold">${o.totalPrice}</td>
                      <td className="px-6 py-4 text-gray-400">{o.orderDate}</td>
                      <td className="px-6 py-4">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o, e.target.value)}
                          className={`text-xs px-2 py-1.5 rounded-lg border-0 font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500 ${statusColors[o.status] || 'bg-gray-600 text-gray-300'}`}
                        >
                          {statuses.map((s) => <option key={s} value={s} className="bg-gray-800 text-white">{s}</option>)}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDelete(o.id)} className="text-red-400 text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SelledProducts;
