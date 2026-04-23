import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, adminUser } = useAuth();
  const currentUser = user || adminUser;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders for this user
        const res = await axios.get('http://localhost:3001/Orders');
        const userOrders = res.data.filter(
          (o) => o.userId === Number(currentUser.id) || o.userId === String(currentUser.id)
        );
        // Sort by newest
        userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        
        // Fetch product details for these orders
        const ordersWithProducts = await Promise.all(userOrders.map(async (order) => {
          try {
            const prodRes = await axios.get(`http://localhost:3001/Products/${order.productId}`);
            return { ...order, product: prodRes.data };
          } catch {
            return { ...order, product: { name: 'Unknown Product', image: 'https://placehold.co/100x100?text=?', price: 0 }};
          }
        }));
        
        setOrders(ordersWithProducts);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <img
            src={currentUser.avatar || 'https://i.pravatar.cc/150'}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover shadow-xl z-10"
          />
          <div className="text-center md:text-left z-10 flex-1">
            <h1 className="text-3xl font-extrabold mb-2">{currentUser.name}</h1>
            <p className="text-indigo-400 font-medium mb-4">{currentUser.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700">
                <span>🛡️</span> Role: {currentUser.role || 'User'}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700">
                <span>📅</span> Joined: {currentUser.createdAt || 'N/A'}
              </span>
              {currentUser.phone && (
                <span className="flex items-center gap-1.5 bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700">
                  <span>📞</span> {currentUser.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Orders History */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📦</span> Order History
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4 opacity-50">🛒</div>
              <h3 className="text-xl font-bold mb-2">No orders yet</h3>
              <p className="text-gray-400">When you buy something, it will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 transition-colors hover:border-indigo-500/30">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img 
                      src={order.product.image} 
                      alt={order.product.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 bg-gray-800"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-lg font-bold hover:text-indigo-400 transition-colors cursor-pointer">
                            {order.product.name}
                          </h3>
                          <p className="text-gray-400 text-sm">Order #{order.id} • {order.orderDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-800">
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Price</p>
                          <p className="text-white font-medium">${order.product.price?.toFixed(2) || '0.00'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase font-semibold">Qty</p>
                          <p className="text-white font-medium">× {order.quantity}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                          <p className="text-indigo-400 font-bold text-lg">${Number(order.totalPrice).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
