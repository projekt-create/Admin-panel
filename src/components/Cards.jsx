import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const categoryColors = {
  Electronics: 'bg-blue-500/20 text-blue-400',
  Clothing: 'bg-purple-500/20 text-purple-400',
  Home: 'bg-green-500/20 text-green-400',
  Sports: 'bg-yellow-500/20 text-yellow-400',
  Books: 'bg-pink-500/20 text-pink-400',
};

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();

  const cartItem = cartItems.find((i) => i.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock === 0;
  const maxReached = cartQty >= product.stock;

  const handleAdd = () => {
    if (isOutOfStock || maxReached) {
      toast.warning(`Only ${product.stock} available in stock!`, {theme: 'dark', autoClose: 2000});
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛍️`, {
      position: 'bottom-right',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  const categoryClass = categoryColors[product.category] || 'bg-gray-500/20 text-gray-400';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryClass}`}>
            {product.category}
          </span>
        </div>
        {product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500/90 text-white text-xs px-2 py-1 rounded-full shadow-lg">
              Low Stock: {product.stock}
            </span>
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm z-10 transition-opacity">
            <div className="text-center transform flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center text-red-500 text-4xl mb-2 drop-shadow-xl font-black">
                ✕
              </div>
              <span className="text-white font-extrabold tracking-widest uppercase text-sm bg-red-500/90 px-4 py-1.5 rounded-full shadow-lg">
                Sold Out
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-orange-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 flex-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-orange-400 font-bold text-xl">${product.price.toFixed(2)}</span>
            <p className="text-gray-500 text-xs mt-0.5">{product.stock} in stock</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={isOutOfStock || maxReached}
            className={`text-sm px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-1.5 ${
              (isOutOfStock || maxReached) 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white shadow-lg shadow-indigo-500/20'
            }`}
          >
            {isOutOfStock ? 'Sold Out' : maxReached ? 'Max Qty' : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
