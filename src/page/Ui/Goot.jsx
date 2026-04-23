import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center p-8">
      <div className="text-9xl font-extrabold bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
        404
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/products"
          className="border border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-400 px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Shop Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
