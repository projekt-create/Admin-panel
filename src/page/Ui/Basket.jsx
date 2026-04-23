import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder, updateProduct } from '../../api/api';
import { toast } from 'react-toastify';

const Basket = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user, adminUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user && !adminUser) {
      toast.info('Please login to checkout! 🛒', { theme: 'dark' });
      navigate('/login');
      return;
    }

    try {
      const currentUser = user || adminUser;

      for (const item of cartItems) {
        // Decrease stock
        const newStock = Math.max(0, item.stock - item.quantity);
        await updateProduct(item.id, { ...item, stock: newStock });
        
        // Create order
        await createOrder({
          id: String(Date.now() + Math.floor(Math.random() * 1000)),
          userId: currentUser.id,
          productId: item.id,
          quantity: item.quantity,
          totalPrice: item.quantity * item.price,
          status: 'pending',
          orderDate: new Date().toISOString().split('T')[0]
        });
      }

      toast.success('Order placed successfully! 🎉', { theme: 'dark', autoClose: 3000 });
      clearCart();
    } catch (error) {
      console.error(error);
      toast.error('Failed to checkout. Try again.', { theme: 'dark' });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center p-8">
        <div className="text-8xl mb-6 animate-bounce">🛒</div>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link
          to="/products"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 border-b border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold">Shopping Cart</h1>
          <p className="text-gray-400 mt-1">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-2xl p-4 flex gap-4 hover:border-orange-500/30 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.category}</p>
                  <p className="text-orange-400 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 bg-gray-700 rounded-xl px-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-8 text-gray-300 hover:text-orange-400 font-bold text-lg transition-colors"
                    >
                      −
                    </button>
                    <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-8 text-gray-300 hover:text-orange-400 font-bold text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-white font-semibold text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              Clear all items
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sticky top-20">
              <h3 className="text-white font-bold text-lg mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400 truncate max-w-[60%]">{item.name} × {item.quantity}</span>
                    <span className="text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-gray-300">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-green-400">{totalPrice >= 50 ? 'Free' : '$4.99'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-700">
                  <span className="text-white">Total</span>
                  <span className="text-orange-400">${(totalPrice + (totalPrice >= 50 ? 0 : 4.99)).toFixed(2)}</span>
                </div>
              </div>

              {totalPrice < 50 && (
                <p className="text-xs text-gray-500 mb-4 bg-gray-700 rounded-lg p-3">
                  Add <span className="text-orange-400 font-semibold">${(50 - totalPrice).toFixed(2)}</span> more for free shipping!
                </p>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
              >
                Checkout 🎉
              </button>
              <Link
                to="/products"
                className="block text-center text-gray-400 hover:text-orange-400 text-sm mt-3 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
