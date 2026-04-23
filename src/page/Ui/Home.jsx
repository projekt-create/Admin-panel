import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/Cards';
import { getProducts } from '../../api/api';

const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

const HERO_STATS = [
  { value: '500+', label: 'Products' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Rating' },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.slice(0, 6)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600/20 via-purple-600/10 to-gray-950 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              Fast Worldwide Shipping
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Discover
              <span className="bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"> Amazing </span>
              Products
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
              Shop from our curated collection of top-quality products across all categories. Fast shipping, best prices, satisfaction guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
              >
                Shop Now 🛍️
              </Link>
              <Link
                to="/about"
                className="border border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-indigo-400 px-8 py-3.5 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-indigo-400">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6 text-white">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.slice(1).map((cat) => {
            const icons = { Electronics: '💻', Clothing: '👕', Home: '🏠', Sports: '⚽', Books: '📚' };
            return (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                className="bg-gray-800 hover:bg-indigo-500/10 border border-gray-700 hover:border-indigo-500/50 rounded-2xl p-4 text-center transition-all duration-200 group"
              >
                <div className="text-3xl mb-2">{icons[cat]}</div>
                <p className="text-gray-300 group-hover:text-indigo-400 text-sm font-medium transition-colors">{cat}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Products</h2>
            <p className="text-gray-400 text-sm mt-1">Handpicked for you</p>
          </div>
          <Link
            to="/products"
            className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 rounded-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Get Free Shipping Today!</h2>
            <p className="text-indigo-100 mb-8 text-lg">On all orders over $50. Limited time offer.</p>
            <Link
              to="/products"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-3.5 rounded-xl font-bold text-lg transition-all duration-200 active:scale-95 inline-block"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
