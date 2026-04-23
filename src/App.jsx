import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './Router/Router';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRouter />
        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
